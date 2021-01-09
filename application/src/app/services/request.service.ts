import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  URL = `http://localhost:3000` ;

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  getAll(): Observable<any>{
    return this._http.get(`${this.URL}/allRequests`);
  }
  deleteOne(id: any): Observable<any>{
    return this._http.post(`${this.URL}/Delete/${id}`, null);
  }
  addOne(obj: any){
    return this._http.post(`${this.URL}/addRequests`, obj);
  }

  getAllForworkspace(id:any):Observable<any>{
    return this._http.get(`${this.URL}/allRequests/${id}`)
  }

  editStatus(id:any,obj:any){
    return this._http.patch(`${this.URL}/EditStatus/${id}`, obj)
  }
}