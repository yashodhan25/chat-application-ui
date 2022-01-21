import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiserverurl, socketserverurl } from 'src/environments/environment.prod';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  socket:any

  constructor(private http: HttpClient) { }

  uploadfile(id:any, fileinfo:any):Observable<any>{
    const formData = new FormData(); 
    formData.append("id", id);
    formData.append("uploadfiles", fileinfo);
    return this.http.post(`${apiserverurl}upload/`, formData);
  }

  metadata(dataset:any):Observable<any>{
    return this.http.post(`${apiserverurl}send/`, dataset);
  }

  senddata(dataset:any){
    this.socket = io(`${socketserverurl}`);
    this.socket.emit('sendresponce', {'sender': dataset[0], 'receiver': dataset[1], 'message': dataset[2], 'caption':dataset[3] , 'time': dataset[4] , 'file': dataset[5] }  );
  }

  senddata2(dataset:any){    
    this.socket = io(`${socketserverurl}`);
    this.socket.emit('sendresponcetogroup', {'id':dataset[0], 'sender': dataset[1], 'receiver': dataset[2], 'message': dataset[3], 'caption':dataset[4] , 'time': dataset[5] , 'file': dataset[6] }  );
  }

}