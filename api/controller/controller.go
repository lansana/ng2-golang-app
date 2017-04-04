package controller

import (
	"os"
	"fmt"

	"angular2-golang-chat-room/lib/distributor"
	"angular2-golang-chat-room/lib/websocket"
	"github.com/gin-gonic/gin"
)

// ClientCount returns a JSON response of the count of clients in the websocket hub
func ClientCount(c *gin.Context, hub *websocket.Hub) {
	c.JSON(200, gin.H{
		"success": true,
		"client_count": len(hub.Clients),
	})
}

// Size returns a JSON response containing the file size of payloads
func PayloadFileSize(c *gin.Context) {
	f, err := os.Open("payloads.txt")
	if err != nil {
		fmt.Println(err)

		c.JSON(200, gin.H{
			"success": false,
			"message": err.Error(),
			"file_size": nil,
		})
		return
	}
	defer f.Close()

	stat, err := f.Stat()
	if err != nil {
		fmt.Println(err)

		c.JSON(200, gin.H{
			"success": false,
			"message": err.Error(),
			"file_size": nil,
		})
		return
	}

	c.JSON(200, gin.H{
		"success": true,
		"file_size": stat.Size(),
	})
}

// Attack initiates a DoS attack if applicable, and returns a JSON response
func Attack(c *gin.Context) {
	cfg := new(distributor.AttackConfig)
	if err := c.BindJSON(cfg); err != nil {
		fmt.Println(err)

		c.JSON(200, gin.H{
			"success": false,
			"message": "Invalid JSON format.",
		})
		return
	}

	if (distributor.InProgress()) {
		c.JSON(200, gin.H{
			"success": false,
			"message": "Sorry, attack already in progress.",
		})
		return
	}

	distributor.Attack(cfg)

	c.JSON(200, gin.H{
		"success": true,
		"message": "Your attack has been successfully initiated!",
	})
}

// Receive receives a DoS attack and writes the payload data to a file
func ReceivePayload(c *gin.Context) {

}