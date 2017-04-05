import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { NotesService } from '../../shared';

import { Observable } from 'rxjs';

@Injectable()
export class NoteListResolver implements Resolve<Observable<any>> {
    constructor(private notesService: NotesService) {}

    resolve(): Observable<any> {
        return this.notesService.getAll();
    }
}
