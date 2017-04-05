import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
    note: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: {resolved}) => {
            this.note = data.resolved.note;
        });
    }
}
