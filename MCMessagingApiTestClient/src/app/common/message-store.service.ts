import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MessageStoreService {

  private api = 'https://messaging.medocheck.com';
  constructor(private http: Http) { }

  getMessageList(token): any {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);
    console.log(token);
    console.log(header);
    return this.http.get(`${this.api}/messages/receive`, { headers: header})
      .retry(3).map(response => response.json()).catch(this.errorHandler);
  }

  acknowledgeMessage(token, id): any {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.api}/messages/acknowledge/${id}`,'', { headers: header})
    .map(response => response.json()).catch(this.errorHandler);
  }

  errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return Observable.throw(error);
  }
}
