package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"angular2-golang-chat-room/api/controller"
	"angular2-golang-chat-room/lib/websocket"
)

func main() {
	// New router engine
	r := gin.New()

	// Create a hub to store websocket clients, etc.
	hub := websocket.NewHub()

	// Run hub asynchronously to continue on
	go hub.Run()

	// Middleware
	r.Use(CORS())

	// Serve status files
	r.Static("/client/dist", "./client/dist")
	r.Static("/assets", "./client/dist/assets")

	// API routes
	r.GET("/api/note", controller.NoteList)
	r.POST("/api/note", controller.CreateNote)
	r.GET("/api/note/:id", controller.GetNote)
	r.PUT("/api/note/:id", controller.EditNote)
	r.DELETE("/api/note/:id", controller.DeleteNote)
	r.GET("/api/client-count", func(c *gin.Context) {
		controller.Count(c, hub)
	})

	// WebSocket route
	r.GET("/ws", func(c *gin.Context) {
		websocket.ServeWs(hub, c.Writer, c.Request)
	})

	// Serve angular routes
	r.NoRoute(func(c *gin.Context) {
		c.File("./client/dist/index.html")
	})

	// Run on port 80
	r.Run(":3000")
}

// Set up CORS to allow cross-origin requests
func CORS() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods: []string{"POST", "GET", "PUT", "DELETE"},
	})
}