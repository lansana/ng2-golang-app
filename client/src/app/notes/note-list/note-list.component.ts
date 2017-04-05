import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'notes',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    notes: Array<any>;
    notesMemo: Array<any>;
    search: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: {resolved}) => {
            this.notes = data.resolved.notes;
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
