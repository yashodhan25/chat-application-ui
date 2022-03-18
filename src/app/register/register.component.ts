import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  paramsObject:any

  constructor(private route: ActivatedRoute, private routeDirect: Router) { }
 
  ngOnInit(): void {
    localStorage.clear();
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if(this.paramsObject.params.id != null){
        this.login(this.paramsObject.params.id)
      }else{
        alert("please provide GET parameter !")
      }
    });
  }

  login(id:any){
    localStorage.setItem("user_id", id);
    this.routeDirect.navigate(['chats']);
  }

}