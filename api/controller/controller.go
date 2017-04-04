package controller

import (
	"time"

	"angular2-golang-chat-room/lib/websocket"
	"github.com/gin-gonic/gin"
)

// Return JSON response of the count of clients in the websocket hub
func Count(c *gin.Context, hub *websocket.Hub) {
	time.Sleep(1 * time.Second)
	c.JSON(200, gin.H{
		"count": len(hub.Clients),
	})
}