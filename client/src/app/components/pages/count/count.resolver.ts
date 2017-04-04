import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CountService } from './count.service';

import { Observable } from "rxjs";

@Injectable()
export class CountResolver implements Resolve<Observable<any>> {
  constructor(private countService: CountService) {}

  resolve(): Observable<any> {
    return this.countService.getCount();
  }
}
