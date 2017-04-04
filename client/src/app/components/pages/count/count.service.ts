import { Injectable } from '@angular/core';

import { HttpService } from '../../../shared/service/http/http.service';

import { Observable } from 'rxjs';

@Injectable()
export class CountService {
  constructor(private httpService: HttpService) {}

  getCount(): Observable<any> {
    return this.httpService.get(HttpService.getFullUrl() + "/api/count");
  }
}
