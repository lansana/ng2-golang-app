import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from "@angular/router";

import { NotesService, Note } from '../../shared';

import { Observable } from 'rxjs';

@Injectable()
export class NoteModifyResolver implements Resolve<Observable<Note>> {
  constructor(private notesService: NotesService, private route: ActivatedRoute) {}

  resolve(): Observable<Note> {
    return this.notesService.getByID(this.route.params['id']);
  }
}
