import { Injectable } from '@angular/core';

import { HttpService, Note } from '../';
import { environment } from "../../../environments/environment";

import { Observable } from 'rxjs';

@Injectable()
export class NotesService {
    url: string = environment.server_url + "/api/note/";

    constructor(private httpService: HttpService) {}

    getAll(): Observable<Array<Note>> {
        return this.httpService.get(this.url);
    }

    getByID(id: string): Observable<Note> {
        return this.httpService.get(this.url + id);
    }

    create(data: any): Observable<any> {
        return this.httpService.post(this.url, data);
    }

    editByID(id: string, data: any): Observable<any> {
        return this.httpService.put(this.url + id, data);
    }

    deleteById(id: string): Observable<any> {
        return this.httpService.del(this.url + id);
    }
}
