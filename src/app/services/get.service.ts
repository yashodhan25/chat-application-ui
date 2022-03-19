import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor( private http: HttpClient ) { }

  getall(id:any):Observable<any>{
    return this.http.get(`${baseUrl}companyRegistration?page=0&size=20`)
  }

  getallcontacts(pageNo:any,count:any):Observable<any>{
    return this.http.get(`${baseUrl}companyRegistration?page=`+pageNo+`&size=`+count)
  }

}