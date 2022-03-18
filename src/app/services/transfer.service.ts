import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() { }

  mydocevent:any;
  mycustomevent:any; 
  myvideoEvent:any;
  myaudioEvent:any;
  email:any;

  getfile( event:any, myemail:any ){
    this.mycustomevent = event;
    this.email = myemail;
  }

  getDocfile( event:any, myemail:any ){
    this.mydocevent = event;
    this.email = myemail;
  }
  
  getVideoFile(event:any, myemail:any){
    this.myvideoEvent = event;
    this.email = myemail;
  }

  getAudioFile(event:any, myemail:any){
    this.myaudioEvent = event;
    this.email = myemail;
  }

}