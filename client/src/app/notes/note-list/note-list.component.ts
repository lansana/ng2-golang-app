import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Note } from '../../shared';

@Component({
    selector: 'notes',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    notes: Array<Note>;
    notesMemo: Array<Note>;
    search: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: {notes: Array<Note>}) => {
            this.notes = data.notes;
            this.notesMemo = this.notes;
        })
    }

    onChange(): void {
        if (this.search.length === 0) {
            this.notes = this.notesMemo;
        }

        let search = this.search.toLowerCase();

        this.notes = this.notes.filter(note => {
            let title = note.title.toLowerCase();
            let description = note.description.toLowerCase();

            return title.indexOf(search) > -1 || description.indexOf(search) > -1;
        });
    }
}
