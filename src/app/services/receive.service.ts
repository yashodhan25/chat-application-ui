import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiserverurl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReceiveService {

  socket:any;
  list:any

  constructor(private http:HttpClient) { }

  getName(Name:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("email", Name);
    return this.http.post(`${apiserverurl}getContactName/`, formData )
  }

  getGroups(email:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("email", email);
    return this.http.post(`${apiserverurl}getGroupByuseritself/`, formData )
  }

  getGroupName(id:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("id", id);
    return this.http.post(`${apiserverurl}getGroupName/`, formData )
  }

  getGroupDetails(id:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("id", id);
    return this.http.post(`${apiserverurl}getGroupDetailsById/`, formData )
  }

  getHomeData(email:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("email", email);
    return this.http.post(`${apiserverurl}home/`, formData )
  }
  
}