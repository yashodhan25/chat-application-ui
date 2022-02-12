import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from '../services/get.service';
import { CreategroupService } from '../services/creategroup.service';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReceiveService } from '../services/receive.service';
import { SendService } from '../services/send.service';

@Component({
  selector: 'app-selectcontact',
  templateUrl: './selectcontact.component.html',
  styleUrls: ['./selectcontact.component.scss']
})
export class SelectcontactComponent implements OnInit {
  term:any;
  searchText: any;
  contactlist:any;
  senderemail = localStorage.getItem("username");
  loader:any;
  start:any;
  mySelectedPeople:any = [];
  finallist:any = [];
  form: FormGroup;

  constructor(private sendmessage:SendService,private routeDirect: Router, private getpeople:GetService, private createGroup: CreategroupService, private fb: FormBuilder, private receive: ReceiveService) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    }else{
      let i: number = 0;
      checkArray.controls.forEach((item:any, FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    this.start = true;
    this.createGroup.createGroup().subscribe(responce=>{
      this.finallist = [];
      this.finallist.push({'groupName':responce.data.groupName, 'groupTableId':responce.data.id, 'userEmail': localStorage.getItem("username")});
      this.mySelectedPeople = this.form.value.checkArray;
      for(var i=0; i<this.mySelectedPeople.length; i++){
        this.finallist.push({'groupName':responce.data.groupName, 'groupTableId':responce.data.id, 'userEmail': this.mySelectedPeople[i]})
      }
      this.createGroup.addPeople(this.finallist).subscribe(res=>{
        let dataset:any = {
          "caption": "",
          "id": 0,
          "message": '',
          "receiver": responce.data.id,
          "sender": localStorage.getItem("username"),
          "type": "notification"
        }
        this.sendmessage.sendMessage(dataset).subscribe((response)=>{
          this.start = false
          this.routeDirect.navigate(['chats']);
        })
      })
    })

  }

  ngOnInit(): void {
    this.loader = true;
    this.getpeople.getall(this.senderemail).subscribe((users:any)=>{
      this.contactlist = users.data;
      this.loader = false;
    });

  }

}