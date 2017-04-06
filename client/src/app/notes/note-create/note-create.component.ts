import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Note, NotesService, NotificationService } from "../../shared";

@Component({
    selector: 'note-create',
    templateUrl: './note-create.component.html'
})
export class NoteCreateComponent {
    model: Note = {
        id: null,
        title: '',
        description: ''
    };

    constructor(private notesService: NotesService,
                private notificationService: NotificationService,
                private router: Router) {}

    onSubmit(): void {
        this.notesService.create(this.model).subscribe(res => {
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
