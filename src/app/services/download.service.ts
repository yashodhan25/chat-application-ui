import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  data:any;

  downloadfile(filename:any,email:any,imgurl:any){ 
    this.data = [filename, email, imgurl];
  }

}
