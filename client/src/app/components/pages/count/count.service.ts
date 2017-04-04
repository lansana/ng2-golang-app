import { Injectable } from '@angular/core';

import { HttpService } from '../../../lib/service/http/http.service';

import { Observable } from 'rxjs';

@Injectable()
export class CountService {
  uri = "http://" + window.location.hostname + "/api/count";

  constructor(private httpService: HttpService) {}

  getCount(): Observable<any> {
    return this.httpService.get(this.uri);
  }
}
