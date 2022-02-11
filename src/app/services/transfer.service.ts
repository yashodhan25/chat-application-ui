import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() { }

  mydocevent:any;
  mycustomevent:any; 
  email:any;

  getfile( event:any, myemail:any ){
    this.mycustomevent = event;
    this.email = myemail;
  }

  getDocfile( event:any, myemail:any ){
    this.mydocevent = event;
    this.email = myemail;
  }

  id:any;

  setID(id:any){
    this.id = id;
  }

}
