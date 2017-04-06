import { Injectable } from '@angular/core';

import { Note, HttpService } from '../';
import { environment } from "../../../environments/environment";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class NotesService {
    url: string = environment.server_url + "/api/note/";

    constructor(private httpService: HttpService) {}

    getAll(): Observable<Note[]> {
        return this.httpService.get(this.url).map(res => res.notes);
    }

    getByID(id: string): Observable<Note> {
        return this.httpService.get(this.url + id).map(res => res.note);
    }

    create(data: any): Observable<any> {
        return this.httpService.post(this.url, data);
    }

    editByID(id: string, note: Note): Observable<any> {
        return this.httpService.put(this.url + id, note);
    }

    deleteById(id: string): Observable<any> {
        return this.httpService.del(this.url + id);
    }
}
