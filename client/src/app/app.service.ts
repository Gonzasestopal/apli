import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private _url = 'http://127.0.0.1:8080/'

  constructor(private http: HttpClient) { }
  
  public get_change() {
    return this.http
      .get(this._url + '/change')
  }
  
  public save_payment() {
    let options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(this._url + '/pay', options)
  }

  private handleError(error: Response) {
    console.log('An error ocurred ' + error);
    return Observable.throw(error || '500 internal server error');
  }  
  
}
