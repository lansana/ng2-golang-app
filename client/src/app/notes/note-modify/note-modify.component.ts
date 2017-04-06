import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Note, NotesService, NotificationService } from "../../shared";

@Component({
    selector: 'note-modify',
    templateUrl: './note-modify.component.html'
})
export class NoteModifyComponent implements OnInit {
    note: Note;
    model: Note = {
        id: null,
        title: '',
        description: ''
    };
    isEditing: boolean;

    constructor(private notesService: NotesService,
                private notificationService: NotificationService,
                private router: Router,
                private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.isEditing = this.router.url.indexOf('/notes/edit') > -1;

        if (this.isEditing) {
            this.route.data.subscribe((data: {note: Note}) => {
                this.note = data.note;
            });
        }
    }

    onSubmit(): void {
        this.isEditing ? this.edit() : this.create();
    }

    create(): void {
        this.notesService.create(this.model).subscribe(res => this.handleRes(res));
    }

    edit(): void {
        this.notesService.editByID(this.note.id, this.model).subscribe(res => this.handleRes(res));
    }

    handleRes(res: any): void {
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
    }
}
