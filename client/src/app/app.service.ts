import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private _url = 'http://127.0.0.1:8080/'

  constructor(private http: HttpClient) { }
  
  public test() {
    return this.http
      .get(this._url + 'test')
  }

  private handleError(error: Response) {
    console.log('An error ocurred ' + error);
    return Observable.throw(error || '500 internal server error');
  }  
  
}
