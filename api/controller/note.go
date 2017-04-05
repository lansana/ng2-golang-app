package controller

import (
	"angular2-golang-chat-room/lib/arvindb"
	"github.com/gin-gonic/gin"
	"net/http"
	"fmt"
	"time"
)

// NoteList gets a list of all notes
func NoteList(c *gin.Context) {
	time.Sleep(500 * time.Millisecond)

	notes := arvindb.GetNotes()
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"success": true,
		"notes": notes,
	})
}

// GetNote gets a note by id
func GetNote(c *gin.Context) {
	time.Sleep(500 * time.Millisecond)

	note, err := arvindb.GetNoteByID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"success": true,
		"note": note,
	})
}

// CreateNote creates a note
func CreateNote(c *gin.Context) {
	time.Sleep(500 * time.Millisecond)

	var note arvindb.Note
	if err := c.BindJSON(&note); err != nil {
		fmt.Println(err)
		return
	}

	if err := arvindb.CreateNote(note); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"success": true,
		"message": "Note successfully created!",
	})
}

// EditNote edits a note by id
func EditNote(c *gin.Context) {
	time.Sleep(500 * time.Millisecond)

	var newNote arvindb.Note
	if err := c.BindJSON(&newNote); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"success": false,
			"message": err.Error(),
		})
		return
	}

	err := arvindb.EditNoteByID(c.Param("id"), newNote)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"success": true,
		"message": fmt.Sprintf("'%v' successfully updated!", newNote.Title),
	})
}

// DeleteNote deletes a note by id
func DeleteNote(c *gin.Context) {
	time.Sleep(500 * time.Millisecond)

	err := arvindb.DeleteNoteByID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"success": true,
		"message": "Note successfully deleted!",
	})
}