import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { NotesService, Note } from '../../shared';

import { Observable } from 'rxjs';

@Injectable()
export class NoteDetailResolver implements Resolve<Observable<Note>> {
    constructor(private notesService: NotesService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Note> {
        return this.notesService.getByID(route.params['id']);
    }
}
