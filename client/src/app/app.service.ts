import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private _url = "http://localhost:8000";
  
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }
  
  public get_change() {
    return this.http
      .get(this._url + '/change/', {'headers': this.headers})
  }
  
  public save_payment(total) {
    return this.http
      .post(this._url + '/pay/', total, {'headers': this.headers})
  }

  private handleError(error: Response) {
    console.log('An error ocurred ' + error);
    return Observable.throw(error || '500 internal server error');
  }  
  
}
