import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiserverurl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreategroupService {

  constructor(private http: HttpClient) { }

  groupData:any;

  getgroupdadta(data:any){
    this.groupData = data;
  }

  createGroup():Observable<any>{
    return this.http.post(`${apiserverurl}create/`, this.groupData);
  }

  addPeople(peopledata:any):Observable<any>{
    return this.http.post(`${apiserverurl}addGpMembers/`, peopledata);
  }
  
}