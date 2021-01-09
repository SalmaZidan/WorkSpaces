import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  URL = `http://localhost:3000`

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>{
    return this._http.get(`${this.URL}/allWorkingSpaces`)
  }

  getSingle(id:any):Observable<any>{
    return this._http.get(`${this.URL}/workingSpace/${id}`)
  }

}
