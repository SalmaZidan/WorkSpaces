import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:3000'
  constructor(private _http:HttpClient) { }
 registerUser(data:any):Observable<any>{
  return this._http.post(`${this.URL}/User/Registration`, data)
 }
 signIn(data:any):Observable<any>{
  return this._http.post(`${this.URL}/login`,data)
  }

  showSingleUser(id: any):Observable<any>{
  return this._http.get(`${this.URL}/singleUser/${id}` )
  }
  
  logout(){
  return this._http.patch(`${this.URL}/logout`, null)
  }

  getUser():Observable<any>{
    return this._http.get(`${this.URL}/singleUser`)
  }

  getUserBy(id:any):Observable<any>{
    return this._http.get(`${this.URL}/singleUserBy/${id}`)
  }

  

}
