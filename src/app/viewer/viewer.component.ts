import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../services/download.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  imgurl:any;
  email:any;
  landscape:any = "";
  portrait:any = "";
  filename:any = "";

  constructor( private filedownload: DownloadService ) { }

  download(url:any){
    saveAs(url, this.filename );
  }

  ngOnInit(): void {
    this.filedownload.data

    this.email = this.filedownload.data[0];
    this.filename = this.filedownload.data[1];
    this.imgurl = this.filedownload.data[2];

    let Img = new Image();
    Img.onload = (e: any) => {
      const imgHeight = e.path[0].height;
      const imgWidth = e.path[0].width;
      if(imgHeight < imgWidth){
        this.landscape = "true";
      }else{
        this.portrait = "true"
      }
    }
    Img.src = this.filedownload.data[2]
  }

}