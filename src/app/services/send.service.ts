import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { apiserverurl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SendService {

  constructor(private http: HttpClient) { }

  sendMessage(dataset:any):Observable<any>{
    return this.http.post(`${apiserverurl}send/`, dataset);
  }

  updateSeenStatus(sender_email:any ,receiver_email:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("sender", sender_email);
    formData.append("receiver", receiver_email);
    return this.http.post(`${apiserverurl}/seenStatusUpdate`, formData);
  }

}