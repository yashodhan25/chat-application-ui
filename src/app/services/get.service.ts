import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { apiserverurl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor( private http: HttpClient ) { }

  getall(data:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("email", data);
    return this.http.post(`${apiserverurl}get/`, formData)
  }

}
