import { Injectable } from '@angular/core';

import { HttpService, Client } from '../';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientCountService {
    url: string = environment.server_url + "/api/client-count";

    constructor(private httpService: HttpService) {}

    getCount(): Observable<Client> {
        return this.httpService.get(this.url).map(res => res);
    }
}
