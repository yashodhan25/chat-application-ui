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
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  @ViewChild(ScrollToBottomDirective)
  @HostListener('scroll', ['$event'])

  shown:any="";
  fileData:any;
  gethour:any;
  timemode:any;
  currenttime:any;
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
  groupname:string = "";
  groupusers:any = [];
  newData:any = [];
  newData1:any = [];
  groupchatdata:any = [];
  admindata:any =[];
  groupinfo:any;
  admin:any;
  groupID:any = this.route.snapshot.params.id;

  constructor( private transfer : TransferService, private routeDirect: Router, private route:ActivatedRoute, private sendmessage:SendService, private receive: ReceiveService, private http: HttpClient, private downloadfile: DownloadService ) { }

  save(datadocname:any){
    saveAs(datadocname, datadocname );
  }

  download(filename:any){
    this.nameoffile = filename
    let imgurl = filename;
    this.downloadfile.downloadfile(this.route.snapshot.params.id, this.nameoffile, imgurl)
    this.routeDirect.navigate(['view2']);
  }

  getIMG(event: any) {
    this.transfer.getfile(event,this.route.snapshot.params.id);
    this.routeDirect.navigate(['upload2']);
  }

  getFILE(event: any) {
    this.transfer.getDocfile(event,this.route.snapshot.params.id);
    this.routeDirect.navigate(['upload2']);
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
      this.sender_email = localStorage.getItem("username");
      this.textmessages = messages;
      this.socket.emit('sendresponcetogroup', {'id':this.route.snapshot.params.id, 'sender': localStorage.getItem("username"), 'receiver': this.groupusers, 'message': this.message, 'time': this.currenttime,'caption':'' , 'file': 'false' }  );
      let dataset:any = {
        "caption": "",
        "id": 0,
        "message": this.textmessages,
        "receiver": this.route.snapshot.params.id,
        "sender": this.sender_email,
        "type": ""
      }      
      this.sendmessage.sendMessage(dataset).subscribe((response)=>{
        this.socket.emit('trigger1', { 'receiver': this.route.snapshot.params.id }  );    
        this.socket.on('mymessage1', (data:any)=>{
            this.groupchatdata = [];
            this.tempdata = [];
            if(data != null){
              this.start = false;
            }else{
              this.start = false;
            }
            for(var i=0; i<data.data.length; i++){
              this.coverter(i,data.data)
            }
        })
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

  adminName(email:any){
    const formData = new FormData(); 
    formData.append("email", email);
    this.http.post(`${apiserverurl}getContactName/`, formData ).subscribe(r=>{
      this.admindata = r;
      this.groupinfo = this.admindata.data[0].name+' has created group.';
    })
  }

  ngOnInit(): void {

    // console.log(this.groupchatdata)

    this.receive.getGroupName(this.route.snapshot.params.id).subscribe(r=>{

      if(localStorage.getItem("username") != r.data[0].createdByUserEmail){
        this.adminName(r.data[0].createdByUserEmail);
      }else{
        this.admin = 'true';
        this.groupinfo = 'You has created group.';
      }
    })

    // Socket URL
    this.socket = io(`${socketserverurl}`);
    this.loadingstart = true;
    this.myemail = localStorage.getItem("username");

    this.receive.getGroupName(this.route.snapshot.params.id).subscribe(r=>{
      this.user = r.data;
    })

    this.receive.getGroupDetails(this.route.snapshot.params.id).subscribe(res=>{
      for( var i = 0; i < res.data.length; i++){
        if(localStorage.getItem("username") != res.data[i].userEmail){
          this.groupusers.push(res.data[i].userEmail);
        }
      }
    })

    this.socket.emit('trigger1', { 'receiver': this.route.snapshot.params.id }  );  
    this.socket.on('mymessage1', (data:any)=>{
      if(data != null){
        this.loadingstart = false;
      }else{
        this.loadingstart = false;
      }
      for(var i=0; i<data.data.length; i++){
        this.coverter(i,data.data)
      }
    })
    
    this.socket.emit('connected',localStorage.getItem("username"));
    this.socket.on('getMessageFromSender', (data:any)=>{
      if(data.id == this.route.snapshot.params.id && data.sender != localStorage.getItem("username") ){
        this.tempdata.push(data);
        this.tempcoverter(this.tempdata.length, data.sender);
      }
    })

  }

  tempcoverter(count:any, email:any){
    this.newData1 = [];
    const formData = new FormData(); 
    formData.append("email", email);
    this.http.post(`${apiserverurl}getContactName/`, formData ).subscribe(r=>{
      this.newData1 = r;
      this.tempdata[count-1].name = this.newData1.data[0].name; 
    })
  }

  coverter(count:any, chatdata:any){
    this.newData = [];
    const formData = new FormData(); 
    formData.append("email", chatdata[count].sender);
    this.http.post(`${apiserverurl}getContactName/`, formData ).subscribe(r=>{
      this.newData = r;

      let finaldata = {
        'id': chatdata[count].id,
        'name': this.newData.data[0].name,
        'sender': chatdata[count].sender,
        'receiver': chatdata[count].receiver,
        'message': chatdata[count].message,
        'caption': chatdata[count].caption,
        'time': chatdata[count].time,
        'type': chatdata[count].type,
        'uploadfiles': chatdata[count].uploadfiles
      }
      this.groupchatdata.push(finaldata);
    })

  }

  get sortData() {
    return this.groupchatdata.sort((a:any, b:any) => {
      return <any>a.id - <any>b.id;
    });
  }

}
