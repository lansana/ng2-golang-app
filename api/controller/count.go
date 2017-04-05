package controller

import (
	"time"

	"angular2-golang-chat-room/lib/websocket"
	"github.com/gin-gonic/gin"
)

// Count returns a JSON response of the count of clients in the websocket hub
func Count(c *gin.Context, hub *websocket.Hub) {
	time.Sleep(500 * time.Millisecond)
	c.JSON(200, gin.H{
		"count": len(hub.Clients),
	})
}