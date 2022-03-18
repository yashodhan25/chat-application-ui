import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReceiveService } from '../services/receive.service';
import { TransferService } from '../services/transfer.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-fileupload2',
  templateUrl: './fileupload2.component.html',
  styleUrls: ['./fileupload2.component.scss']
})
export class Fileupload2Component implements OnInit {

  // File Upload Operation
  fileData:any = null;
  localUrl: any;
  localVideoUrl:any;
  localAudioUrl:any;
  emojiPickerVisible:any;
  message = '';
  myEvent = this.trans.mycustomevent;
  myDocEvent = this.trans.mydocevent;
  myVideoEvent = this.trans.myvideoEvent;
  myAudioEvent = this.trans.myaudioEvent;
  otherEmail = this.trans.email;
  gethour:any;
  timemode:any;
  currenttime:any;
  sender = localStorage.getItem("user_id");
  caption:any;
  type:any;
  portrait = "";
  lanscape = "";
  start:any;
  socket:any;
  groupusers:any = [];

  constructor(private receive: ReceiveService, private domSanitizer: DomSanitizer ,private trans: TransferService, private uploadfile:UploadService, private routeDirect: Router) { }

  getdata(value:any){

    this.start = true;
    if(this.localUrl != null){
      this.type = 'image';
    }else if(this.localVideoUrl != null){
      this.type = 'video';
    }else if(this.localAudioUrl != null){
      this.type = 'audio';
    }else{
      this.type = 'doc';
    }
    this.caption = value;
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

    let dataset:any = {
      "caption": this.caption,
      "id": 0,
      "message": "",
      "receiver": this.otherEmail,
      "sender": this.sender,
      "type": this.type,
      "seenby": "",
      'entityType': 'group'
    }


    this.uploadfile.metadata(dataset).subscribe(responce =>{

      this.uploadfile.uploadfile(responce.data.id, this.fileData).subscribe(res=>{
        this.start = false;
        let dataset = [this.otherEmail, res.data.sender, this.groupusers, res.data.uploadfiles, res.data.caption , this.currenttime ,  this.type];
        //console.log(dataset);
        this.uploadfile.senddata2(dataset)
        this.routeDirect.navigate([`chats/gpchatroom`,this.otherEmail]);
      })

    })
    

  }

  ngOnInit(): void {

    this.receive.getGroupDetails(this.otherEmail).subscribe(res=>{
      for( var i = 0; i < res.data.length; i++){
        if(localStorage.getItem("user_id") != res.data[i].userEmail){
          this.groupusers.push(res.data[i].userEmail);
        }
      }
    })

    if(this.myEvent != null){
      if (this.myEvent.target.files && this.myEvent.target.files[0]) {

        // Send file data for Upload file to Server
        this.fileData = this.myEvent.target.files[0];

        const URL = window.URL || window.webkitURL;
        const Img = new Image();

        Img.src = URL.createObjectURL(this.myEvent.target.files[0]);

        Img.onload = (e: any) => {
          const height = e.path[0].height;
          const width = e.path[0].width;
          if(height < width){
            this.lanscape = "true";
          }else{
            this.portrait = "true";
          }

        }
  
        // Preview of file before upload 
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.localUrl = event.target.result;
        }
        reader.readAsDataURL(this.myEvent.target.files[0]);
     
      }
    }
    
    else if(this.myVideoEvent != null){
      if(this.myVideoEvent.target.files && this.myVideoEvent.target.files[0]){

        this.localAudioUrl = null;

        this.fileData = this.myVideoEvent.target.files[0];

        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.localVideoUrl = event.target.result;
        }
        reader.readAsDataURL(this.myVideoEvent.target.files[0]);
      }
    }

    else if(this.myAudioEvent != null){
      if(this.myAudioEvent.target.files && this.myAudioEvent.target.files[0]){
        this.localVideoUrl = null;
        this.fileData = this.myAudioEvent.target.files[0];
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.localAudioUrl = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
        }
        reader.readAsDataURL(this.myAudioEvent.target.files[0]);
      }
    }
    
    else{
      if(this.myDocEvent.target.files && this.myDocEvent.target.files[0]){
        this.fileData = this.myDocEvent.target.files[0];
      }
    }

  }

  ngOnDestroy(): void{
    this.trans.getDocfile(null,null);
    this.trans.getfile(null,null);
  }

  emojiClicked(event:any) {
    this.message += event.emoji.native;
  }

}