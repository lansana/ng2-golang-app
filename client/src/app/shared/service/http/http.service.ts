import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { LoadingBarService } from '../../../components/ui/loading-bar/loading-bar.service';

@Injectable()
export class HttpService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private options = new RequestOptions({
    headers: this.headers
  });

  constructor(private http: Http, private loadingBarService: LoadingBarService) {}

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.loadingBarService.start();

    return this.http.get(url, options || this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()))
      .finally(() => {
        this.loadingBarService.complete();
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.loadingBarService.start();

    return this.http.post(url, JSON.stringify(body), options || this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()))
      .finally(() => {
        this.loadingBarService.complete();
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.loadingBarService.start();

    return this.http.put(url, JSON.stringify(body), options || this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()))
      .finally(() => {
        this.loadingBarService.complete();
      });
  }

  del(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.loadingBarService.start();

    return this.http.delete(url, options || this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()))
      .finally(() => {
        this.loadingBarService.complete();
      });
  }
}
