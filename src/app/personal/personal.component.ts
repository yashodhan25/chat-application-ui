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
  textmsg:any = [];
  textmsg1:any;
  nameoffile:any;
  baseurl = `${apiserverurl}`;
  start:any;
  loadingstart:any;
  tempdata:any[] = [];
  sub:any;
  user_receiver_email:any;
  screen:any

  constructor( private transfer : TransferService, private routeDirect: Router, private route:ActivatedRoute, private sendmessage:SendService, private receive: ReceiveService, private http: HttpClient, private downloadfile: DownloadService ){}

  save(datadocname:any){
    saveAs(datadocname, datadocname );
  }

  download(filename:any){
    this.nameoffile = filename
    let imgurl = filename;
    this.downloadfile.downloadfile(this.user_receiver_email, this.nameoffile, imgurl)
    this.routeDirect.navigate(['chats/view']);
    if(this.screen < 700){
      this.routeDirect.navigate(['view']);
    }
  }

  videoplayer(filename:any, type:any){
    this.nameoffile = filename
    let imgurl = filename;
    this.downloadfile.downloadVideofile(this.user_receiver_email, this.nameoffile, imgurl,type);
    this.routeDirect.navigate(['chats/view']);
    if(this.screen < 700){
      this.routeDirect.navigate(['view']);
    }
  }

  getIMG(event: any) {
    this.transfer.getfile(event,this.user_receiver_email);
    this.routeDirect.navigate(['chats/upload']);
    if(this.screen < 700){
      this.routeDirect.navigate(['upload']);
    }
  }

  getFILE(event: any) {
    this.transfer.getDocfile(event,this.user_receiver_email);
    this.routeDirect.navigate(['chats/upload']);
    if(this.screen < 700){
      this.routeDirect.navigate(['upload']);
    }
  }

  getVideoFILE(event: any) {
    this.transfer.getVideoFile(event, this.user_receiver_email)
    this.routeDirect.navigate(['chats/upload']);
    if(this.screen < 700){
      this.routeDirect.navigate(['upload']);
    }
  }

  getAudioFILE(event: any) {
    this.transfer.getAudioFile(event, this.user_receiver_email)
    this.routeDirect.navigate(['chats/upload']);
    if(this.screen < 700){
      this.routeDirect.navigate(['upload']);
    }
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
    this.textmsg = [];
    this.tempdata = [];

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
      this.receiver_email = this.user_receiver_email;
      this.sender_email = localStorage.getItem("username");
      this.textmessages = messages;

      let dataset:any = {
        "caption": "",
        "id": 0,
        "message": this.textmessages,
        "receiver": this.receiver_email,
        "sender": this.sender_email,
        "type": "",
        "seen": "false"
      }
      
      this.sendmessage.sendMessage(dataset).subscribe((response)=>{

        this.socket = io(`${socketserverurl}`);
        this.socket.emit('sendresponce', {'sender': localStorage.getItem("username"), 'receiver': this.user_receiver_email, 'message': this.message, 'time': this.currenttime,'caption':'' , 'file': 'false' }  );
        
        // Home data Notify
        this.socket.emit('trigger',localStorage.getItem("username"))

        setTimeout(()=>{
          this.getMessages(localStorage.getItem("username"), this.route.snapshot.params.email)
        }, 300);

        this.message = "";  

      });

    }else{
      this.start = false;
      alert("Please Type Something !")
    }

  }


  emojiClicked(event:any) {
    this.option = '';
    this.message += event.emoji.native;
  }

  ngOnInit(): void {
    this.screen = window.innerWidth;
    this.loadingstart = true;
    this.myemail = localStorage.getItem("username");

    this.sub = this.route.params.subscribe(params => {

      this.loadingstart = true;
      this.textmsg = [];
      
      this.user_receiver_email = params['email'];

      this.receive.getName(this.route.snapshot.params.email).subscribe(r=>{
        this.user = r.data;
      })

      if(window.innerWidth < 700){
        this.routeDirect.navigate([`personal`,params['email']]);
      }

      // update seen Status
      this.sendmessage.updateSeenStatus(params['email'],localStorage.getItem("username")).subscribe()

      // Socket URL
      this.socket = io(`${socketserverurl}`);
      // Send Connection Request
      this.socket.emit('connected',localStorage.getItem("username"))
      // get responce from client
      this.socket.on('getMessage', (data:any)=>{
        // Logic for unique message identifier
        if(data.sender == this.route.snapshot.params.email && data.receiver == localStorage.getItem("username")){
          this.tempdata.push(data);
          // auto update seen Status
          this.sendmessage.updateSeenStatus(params['email'],localStorage.getItem("username")).subscribe()
        }
      })
      this.getMessages(localStorage.getItem("username"), this.route.snapshot.params.email)

      // Send Connection Request
      this.socket.emit('seen',this.route.snapshot.params.email)
      this.socket.on('status', (email:any)=>{
        setTimeout(()=>{
          this.data()
        }, 300);
      })

    })

  }

  data(){
    for(let i=0; i<this.textmsg.length; i++){
      console.log(this.textmsg[i].message)
      this.textmsg[i].seen = 'true'
    }
  }

  getMessages(sender:any, receiver:any){
    this.receive.getchats(sender, receiver).subscribe(data=>{

      for(let i = 0; i<data.data.length; i++){

        let date = data.data[i].chatdate.dayOfMonth+" "+data.data[i].chatdate.month.substring(0, 3).toLowerCase();

        let hour = data.data[i].time.substring(0, 2);
        let min = data.data[i].time.substring(3, 5);
        let timezone = data.data[i].time.substring(8, 11);
        let time;
        if(hour.substring(0, 1) == 0){
          time = hour.substring(1, 2)+":"+min+" "+timezone;
        }else{
          time = hour.substring(0, 2)+":"+min+" "+timezone;
        }

        let chatdata = {
          'caption': data.data[i].caption,
          'id': data.data[i].id,
          'message': data.data[i].message,
          'receiver': data.data[i].receiver,
          'sender': data.data[i].sender,
          'time': time,
          'type': data.data[i].type,
          'uploadfiles':data.data[i].uploadfiles,
          'date':date,
          'seen':data.data[i].seen,
        }

        // console.log(chatdata);
        this.textmsg.push(chatdata)

      }
      this.loadingstart = false;
      this.start = false;
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.socket.disconnect();
  }

}