import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Note, NotesService, NotificationService } from "../../shared";

@Component({
    selector: 'note-edit',
    templateUrl: './note-edit.component.html'
})
export class NoteEditComponent implements OnInit {
    note: Note;
    model: Note = {
        id: null,
        title: '',
        description: ''
    };

    constructor(private notesService: NotesService,
                private notificationService: NotificationService,
                private router: Router,
                private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: {note: Note}) => {
            this.note = data.note;
        });
    }

    onSubmit(): void {
        this.notesService.editByID(this.note.id, this.model).subscribe(res => {
            if (res.success) {
                this.notificationService.notify({
                    message: res.message
                });
            } else {
                this.notificationService.notify({
                    message: res.message,
                    isError: true
                });
            }

            this.router.navigateByUrl('/notes');
        });
    }
}
