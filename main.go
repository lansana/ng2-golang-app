package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"angular2-golang-chat-room/api/controller"
	"angular2-golang-chat-room/lib/websocket"
)

// A map containing the routes that should be routed to index.html for
// Angular2 to handle.
var routes map[string]bool = map[string]bool{
	"/": true,
	"/attack": true,
	"/chat-room": true,
	"/count": true,
}

func main() {
	// New router engine
	r := gin.New()

	// Create a hub to store websocket clients, etc.
	hub := websocket.NewHub()

	// Run hub asynchronously to continue on
	go hub.Run()

	// Middleware
	r.Use(clientCORS())
	r.Use(clientRoutes())

	// Serve status files
	r.Static("/client/dist", "./client/dist")
	r.Static("/assets", "./client/dist/assets")

	// Load index.html
	r.LoadHTMLFiles("client/dist/index.html")

	// API routes
	r.GET("/api/count", func(c *gin.Context) {
		controller.Count(c, hub)
	})

	// WebSocket route
	r.GET("/ws", func(c *gin.Context) {
		websocket.ServeWs(hub, c.Writer, c.Request)
	})

	// Run on port 80
	r.Run(":80")
}

// Set up CORS to allow cross-origin requests
func clientCORS() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods: []string{"POST", "GET"},
		AllowHeaders: []string{"Content-Type"},
	})
}

// Set up client routes middleware
func clientRoutes() gin.HandlerFunc {
	return func(c *gin.Context) {
		if routes[c.Request.URL.Path] {
			c.HTML(200, "index.html", nil)
		}
	}
}