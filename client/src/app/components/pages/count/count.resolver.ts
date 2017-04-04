import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { CountService } from './count.service';

import { Observable } from "rxjs";

@Injectable()
export class CountResolver implements Resolve<any> {
  constructor(private countService: CountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.countService.getCount();
  }
}
