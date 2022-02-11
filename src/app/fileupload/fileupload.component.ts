import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  // File Upload Operation
  fileData:any = null;
  localUrl: any;
  emojiPickerVisible:any;
  message = '';
  myEvent = this.trans.mycustomevent;
  myDocEvent = this.trans.mydocevent;
  otherEmail = this.trans.email;
  gethour:any;
  timemode:any;
  currenttime:any;
  sender = localStorage.getItem("username");
  caption:any;
  type:any;
  portrait = "";
  lanscape = "";
  start:any;
  socket:any;

  constructor(private trans: TransferService, private uploadfile:UploadService, private routeDirect: Router) { }

  
  
  getdata(value:any){

    
    
    this.start = true;
    if(this.localUrl != null){
      this.type = 'image';
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
      "type": this.type
    }


    this.uploadfile.metadata(dataset).subscribe(responce =>{

      this.uploadfile.uploadfile(responce.data.id, this.fileData).subscribe(res=>{
        this.start = false;
        let dataset = [res.data.sender, res.data.receiver, res.data.uploadfiles, res.data.caption , this.currenttime ,  this.type];
        this.uploadfile.senddata(dataset)
        //console.log(dataset)
        this.routeDirect.navigate([`chats/personal`,this.otherEmail]);
      })

    })
    

  }


  ngOnInit(): void {

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
    }else{
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