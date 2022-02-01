import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetallService } from '../services/getall.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  useremail = "";
  dataarray:any;
  socket:any;

  constructor(
    private routeDirect: Router,
    private getemail: GetallService
  ) { }

  loginDetails:any = new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email])
    }
  )

  userData(getemail:any){
    localStorage.setItem("username", getemail);
    this.routeDirect.navigate(['chats']);
  }

  ngOnInit(): void {
    this.getemail.getall().subscribe(responce => {
      this.dataarray = responce.data;
    })

    if(localStorage.getItem("username") != null){
      this.routeDirect.navigate(['chats']);
    }
    
  }

}
