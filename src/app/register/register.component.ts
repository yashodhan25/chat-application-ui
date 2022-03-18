import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetallService } from '../services/getall.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  paramsObject:any

  constructor(private route: ActivatedRoute, private routeDirect: Router) { }
 
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
    });
    if(this.paramsObject.params.id != null){
      localStorage.clear();
      this.login(this.paramsObject.params.id)
    }else{
      alert("please provide GET parameter !")
    }

  }

  login(id:any){
    localStorage.setItem("user_id", id);
    this.routeDirect.navigate(['chats']);
  }

}

// this.routeDirect.navigate(['chats']);
// console.log(this.paramsObject.params.id)
// http://localhost:4200/#/register?id=2880
// if(this.paramsObject.params[0] == null){
//   alert("please provide GET Parameter like ?id=_id");
// }else{
//   console.log(this.paramsObject.params.id)
//   localStorage.clear();
//   localStorage.setItem("user_id", this.paramsObject.params.id);
//   this.routeDirect.navigate(['chats']);
// }