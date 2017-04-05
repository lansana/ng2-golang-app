import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Note } from '../../shared';

@Component({
    selector: 'note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
    note: Note;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: {note: Note}) => {
            this.note = data.note;
        });
    }
}