import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Note, NotesService, NotificationService } from '../../shared';

@Component({
    selector: 'note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
    note: Note;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private notificationService: NotificationService,
                private notesService: NotesService) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: {note: Note}) => {
            this.note = data.note;
        });
    }

    edit(): void {
      this.router.navigateByUrl('/notes/edit/' + this.note.id);
    }

    remove(): void {
      this.notesService.deleteById(this.note.id).subscribe(res => {
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
