import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { NotesService } from '../notes.service';

import { Observable } from 'rxjs';

@Injectable()
export class NoteDetailResolver implements Resolve<Observable<any>> {
  constructor(private notesService: NotesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.notesService.getByID(route.params['id']);
  }
}
