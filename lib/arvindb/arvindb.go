package arvindb

import (
	"errors"
	"sync"
	"strconv"
	"time"
)

const (
	notFoundByIDErr string = "Could not find note with given id"
)

var (
	notes   []Note
	notesMu sync.Mutex

	nextNoteID   int = 0
	nextNoteIDMu sync.Mutex
)

type Note struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

// GetNotes gets all notes
func GetNotes() []Note {
	time.Sleep(50 * time.Millisecond)

	return notes
}

// GetNoteByID gets a note by id
func GetNoteByID(id string) (*Note, error) {
	time.Sleep(50 * time.Millisecond)

	for i, _ := range notes {
		if notes[i].ID == id {
			return &notes[i], nil
		}
	}

	return &Note{}, errors.New(notFoundByIDErr)
}

// CreateNote create a note
func CreateNote(n Note) error {
	time.Sleep(50 * time.Millisecond)

	nextNoteIDMu.Lock()
	defer nextNoteIDMu.Unlock()

	note := Note{
		ID:          strconv.Itoa(nextNoteID),
		Title:       n.Title,
		Description: n.Description,
	}

	notes = append(notes, note)

	nextNoteID++

	return nil
}

// EditNoteByID edits a note by id
func EditNoteByID(id string, newNote Note) error {
	time.Sleep(50 * time.Millisecond)

	note, err := GetNoteByID(id)
	if err != nil {
		return err
	}

	note.Description = newNote.Description
	note.Title = newNote.Title

	return nil
}

// DeleteNoteByID deletes a note by id
func DeleteNoteByID(id string) error {
	time.Sleep(50 * time.Millisecond)

	note, err := GetNoteByID(id)
	if err != nil {
		return err
	}

	notesMu.Lock()
	defer notesMu.Unlock()

	notes, err = getNotesNotIncluding(note.ID)
	if err != nil {
		return err
	}

	return nil
}

// getNotesNotIncluding gets all notes excluding a note with a given id
func getNotesNotIncluding(id string) ([]Note, error) {
	time.Sleep(50 * time.Millisecond)

	var newNotes []Note
	for _, note := range notes {
		if note.ID != id {
			newNotes = append(newNotes, note)
		}
	}

	return newNotes, nil
}
