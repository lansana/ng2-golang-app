import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { NotesService, Note } from '../../shared';

import { Observable } from 'rxjs';

@Injectable()
export class NoteListResolver implements Resolve<Observable<Note[]>> {
    constructor(private notesService: NotesService) {}

    resolve(): Observable<Note[]> {
        return this.notesService.getAll();
    }
}
