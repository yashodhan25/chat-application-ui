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
  loader:any;

  constructor(private routeReverse:Router, private getpeople:GetService) { }

  logOut(){
    localStorage.clear();
    this.routeReverse.navigate(['register']);
  }

  ngOnInit(): void {    
    this.loader = true;
    this.getpeople.getall(this.senderemail).subscribe((users:any)=>{
      this.contactlist = users.data;
      this.loader = false;
    });
  }

}