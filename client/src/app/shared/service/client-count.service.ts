import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class ClientCountService {
    constructor(private httpService: HttpService) {}

    getCount(): Observable<any> {
        return this.httpService.get(environment.server_url + "/api/client-count");
    }
}
