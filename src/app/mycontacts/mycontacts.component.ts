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
  contactlist:any;
  senderemail = localStorage.getItem("username");
  userId = localStorage.getItem("user_id"); 
  loader:any;

  constructor(private routeReverse:Router, private getpeople:GetService) { }

  ngOnInit(): void {    
    this.loader = true;
    this.getpeople.getall(this.userId).subscribe((users:any)=>{
      this.getpeople.getallcontacts(users.totalElements).subscribe((peoples)=>{
        this.contactlist = peoples.content
        this.loader = false;
      })
    });
  }

}