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
  videourl:any;
  email:any;
  landscape:any = "";
  portrait:any = "";
  filename:any = "";
  type:any = null;

  constructor( private filedownload: DownloadService ) { }

  download(url:any){
    saveAs(url, this.filename );
  }

  ngOnInit(): void {
    this.email = this.filedownload.data[0];
    this.filename = this.filedownload.data[1];
    this.type = this.filedownload.data[3];
    
    if(this.type == null){
      this.imgurl = this.filedownload.data[2];
      this.videourl = null;
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
    }else{
      /*============================= Video Player Settings ============================*/
      this.imgurl = null;
      this.videourl = this.filedownload.data[2];
    }
  }

  ngOnDestroy() {
    this.imgurl = null;
    this.videourl = null;
  }

}