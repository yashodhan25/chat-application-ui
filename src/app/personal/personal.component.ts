import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SendService } from '../services/send.service';
import { ReceiveService } from '../services/receive.service';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ScrollToBottomDirective } from '../scroll-to-bottom.directive';
import { DownloadService } from '../services/download.service';
import { saveAs } from 'file-saver';
import { apiserverurl, socketserverurl } from 'src/environments/environment.prod';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})

export class PersonalComponent implements OnInit {
  @ViewChild(ScrollToBottomDirective)
  @HostListener('scroll', ['$event'])

  shown:any="";
  fileData:any;
  gethour:any;
  timemode:any;
  currenttime:any;
  receiver_email:any;
  sender_email:any;
  textmessages:any;
  user:any;
  option = '';
  emojiPickerVisible:any;
  message = '';
  socket:any;
  myemail:any;
  textmsg:any;
  textmsg1:any;
  nameoffile:any;
  baseurl = `${apiserverurl}`;
  start:any;
  loadingstart:any;
  tempdata:any[] = [];

  constructor( private transfer : TransferService, private routeDirect: Router, private route:ActivatedRoute, private sendmessage:SendService, private receive: ReceiveService, private http: HttpClient, private downloadfile: DownloadService ){}

  save(datadocname:any){
    saveAs(datadocname, datadocname );
  }

  download(filename:any){
    this.nameoffile = filename
    let imgurl = filename;
    this.downloadfile.downloadfile(this.route.snapshot.params.email, this.nameoffile, imgurl)
    this.routeDirect.navigate(['view']);
  }

  getIMG(event: any) {
    this.transfer.getfile(event,this.route.snapshot.params.email);
    this.routeDirect.navigate(['upload']);
  }

  getFILE(event: any) {
    this.transfer.getDocfile(event,this.route.snapshot.params.email);
    this.routeDirect.navigate(['upload']);
  }

  options(){
    this.emojiPickerVisible = false;
    if(this.option != ""){
      this.option = '';
    }else{
      this.option = 'display';
    }
  }

  clear(){
    this.option = '';
    this.emojiPickerVisible = false;
  }

  send(messages:any){

    this.start = true;

    this.socket = io(`${socketserverurl}`);

    if(messages != ""){

      let date: Date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      
      if(hour >= 12){
        this.gethour = hour - 12;  
        this.timemode = "PM";
      }else{
        this.gethour = hour;
        this.timemode = "AM";
      }
      this.currenttime = this.gethour+":"+minute+" "+this.timemode;
      this.receiver_email = this.route.snapshot.params.email;
      this.sender_email = localStorage.getItem("username");
      this.textmessages = messages;

      this.socket.emit('sendresponce', {'sender': localStorage.getItem("username"), 'receiver': this.route.snapshot.params.email, 'message': this.message, 'time': this.currenttime,'caption':'' , 'file': 'false' }  );

      let dataset:any = {
        "caption": "",
        "id": 0,
        "message": this.textmessages,
        "receiver": this.receiver_email,
        "sender": this.sender_email,
        "type": ""
      }
      
      this.sendmessage.sendMessage(dataset).subscribe((response)=>{
        this.socket.emit('trigger', { 'sender': localStorage.getItem("username"), 'receiver': this.route.snapshot.params.email }  );    
        this.socket.on('mymessage', (data:any)=>{
            this.tempdata = [];
            this.textmsg = data.data;
            if(data != null){
              this.start = false;
            }else{
              this.start = false;
            }
        })
        this.message = "";  
      });

    }

  }


  emojiClicked(event:any) {
    this.option = '';
    this.message += event.emoji.native;
  }
  
  ngOnInit(): void {
    
    this.loadingstart = true;
    this.myemail = localStorage.getItem("username");

    this.receive.getName(this.route.snapshot.params.email).subscribe(r=>{
      this.user = r.data;
    })

    // Socket URL
    this.socket = io(`${socketserverurl}`);
    
    // Send Connection Request
    this.socket.emit('connected',localStorage.getItem("username"))

    // Display default Messages
    this.socket.emit('trigger', { 'sender': localStorage.getItem("username"), 'receiver': this.route.snapshot.params.email }  );

    // get responce from client
    this.socket.on('getMessage', (data:any)=>{

      // Logic for unique message identifier
      if(data.sender == this.route.snapshot.params.email && data.receiver == localStorage.getItem("username")){
        this.tempdata.push(data);
      }

    })

    // Load the messages after open activity
    this.socket.on('mymessage', (data:any)=>{
      this.textmsg = data.data;
      if(data != null){
        this.loadingstart = false;
      }else{
        this.loadingstart = false;
      }
    })

  }

  ngOnDestroy() {
  }


}