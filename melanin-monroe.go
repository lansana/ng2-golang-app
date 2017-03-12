package main

import (
	"gopkg.in/gin-gonic/gin.v1"
)

var routes map[string]bool = map[string]bool{
	"/welcome": true,
	"/about": true,
	"/gallery": true,
	"/rates": true,
	"/screening": true,
}

// Frontend routes middleware. If any are hit, render index.html so that
// Angular 2 does it's own routing with the path. This allows page refreshes.
func frontendRoutes() gin.HandlerFunc {
	return func(c *gin.Context) {
		if routes[c.Request.URL.Path] {
			c.HTML(200, "index.html", nil)
		}
	}
}

func main() {
	r := gin.Default()

	// Middleware
	r.Use(frontendRoutes())

	// Serve status files
	r.Static("/frontend/dist", "./frontend/dist")
	r.Static("/assets", "./frontend/dist/assets")

	// Load index.html
	r.LoadHTMLFiles("frontend/dist/index.html")

	// Run on port 80
	r.Run(":80")
}