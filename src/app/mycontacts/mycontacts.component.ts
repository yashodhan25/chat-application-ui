import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from '../services/get.service';

@Component({
  selector: 'app-mycontacts',
  templateUrl: './mycontacts.component.html',
  styleUrls: ['./mycontacts.component.scss']
})
export class MycontactsComponent implements OnInit {

  term:any;
  searchText: any;
  contactlist:any = [];
  senderemail = localStorage.getItem("username");
  userId = localStorage.getItem("user_id"); 
  loader:any;

  constructor(private routeReverse:Router, private getpeople:GetService) { }

  count:number = 0;
  loadingstart:any;

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop <= event.target.scrollHeight) {

        if(event.target.scrollTop == 0){
          this.count += 1;
          this.loadingstart = true;
          this.getpeople.getallcontacts(this.count,20).subscribe((peoples)=>{
            for(let i=0; i< peoples.content.length; i++){
              this.contactlist.push(peoples.content[i])
            } 
            this.contactlist.reverse()
            this.loadingstart = false;
          })
        }

    }
  }

  ngOnInit(): void {    
    this.loader = true;
    this.getpeople.getall(this.userId).subscribe((users:any)=>{
      for(let i=0; i< users.content.length; i++){
        this.contactlist.push(users.content[i])
      }
      this.contactlist.reverse()
      this.loader = false;
    });
  }

}