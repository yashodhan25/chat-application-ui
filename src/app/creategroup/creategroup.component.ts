import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreategroupService } from '../services/creategroup.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.scss']
})
export class CreategroupComponent implements OnInit {

  constructor( private createGroup: CreategroupService, private routeDirect: Router ) { }

  emojiPickerVisible:boolean = false;

  message = '';

  groupdata:any;

  alerttext:boolean = false;

  getvalue(value:any){
    if(value == ""){
      this.alerttext = true;
    }else{
      this.alerttext = false;
      
      this.groupdata = {
        "createdByUserEmail": localStorage.getItem("username"),
        "groupName": value,
        "is_active": true
      }

      this.createGroup.getgroupdadta(this.groupdata);
      this.routeDirect.navigate(['SelectContact']);

    }
  }

  emojiClicked(event:any) {
    this.message += event.emoji.native;
    this.emojiPickerVisible = true;
  }

  clearemogi(){
    this.emojiPickerVisible = false;
  }

  ngOnInit(): void {
  }

}