import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private _url = "//localhost:8000";
  
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }
  
  public getChange() {
    return this.http
      .get(this._url + '/change/', {'headers': this.headers})
  }
  
  public savePayment(oneChange, twoChange, tenChange, fiftyChange, hundredChange, totalCost) {
    return this.http
      .post(this._url + '/pay/', {oneChange, twoChange, tenChange, fiftyChange, hundredChange, totalCost}, {'headers': this.headers, withCredentials: true})
  }

  private handleError(error: Response) {
    console.log('An error ocurred ' + error);
    return Observable.throw(error || '500 internal server error');
  }  
  
}
