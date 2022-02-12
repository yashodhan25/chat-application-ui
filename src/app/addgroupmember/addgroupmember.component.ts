import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from '../services/get.service';
import { CreategroupService } from '../services/creategroup.service';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReceiveService } from '../services/receive.service';
import { SendService } from '../services/send.service';
import { apiserverurl } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addgroupmember',
  templateUrl: './addgroupmember.component.html',
  styleUrls: ['./addgroupmember.component.scss']
})
export class AddgroupmemberComponent implements OnInit {

  term:any;
  searchText: any;
  contactlist:any = [];
  senderemail = localStorage.getItem("username");
  loader:any;
  start:any;
  mySelectedPeople:any = [];
  finallist:any = [];
  form: FormGroup;
  groupnamedata:any = []
  groupname:any;
  groupMembers:any = []
  group_id = this.route.snapshot.params.id;
  userArray:any =[];
  userArray1:any =[];
  myname:any;
  myemail:any;


  constructor(private sendmessage:SendService ,private http: HttpClient, private route:ActivatedRoute ,private routeDirect: Router, private getpeople:GetService, private createGroup: CreategroupService, private fb: FormBuilder, private receive: ReceiveService) {
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
    this.mySelectedPeople = this.form.value.checkArray;
    for(var i=0; i<this.mySelectedPeople.length; i++){
      this.finallist.push({'groupName':this.groupname, 'groupTableId':this.route.snapshot.params.id, 'userEmail': this.mySelectedPeople[i]})
    }
    this.createGroup.addPeople(this.finallist).subscribe(res=>{
      for(var i = 0; i<res.data.length; i++){
        const formData = new FormData(); 
        formData.append("email", res.data[i].userEmail);
        this.http.post(`${apiserverurl}getContactName/`, formData ).subscribe(r=>{
          this.userArray = r;
          this.userArray.data[0].name;
          let dataset:any = {
            "caption": "",
            "id": 0,
            "message": this.myname+" is Added "+this.userArray.data[0].name,
            "receiver": this.route.snapshot.params.id,
            "sender": localStorage.getItem("username"),
            "type": "notification"
          }
          this.sendmessage.sendMessage(dataset).subscribe((response)=>{
            this.start = false;
            this.routeDirect.navigate([`chats/gpchatroom`,this.route.snapshot.params.id]);
          })
        })
      }
    })
  }

  datafilter(data:any){
    const formData = new FormData(); 
    formData.append("email", data.email);
    formData.append("id", this.route.snapshot.params.id);
    this.http.post(`${apiserverurl}getGroupByuseritselfboth/`, formData ).subscribe(r=>{
      this.groupMembers = r
      if(this.groupMembers.data.length == 0){
        if(data.email != localStorage.getItem("username")){
          this.contactlist.push(data)
        }
      }
    })

  }


  ngOnInit(): void {
    const formData = new FormData(); 
    this.loader = true;
    this.getpeople.getall(this.senderemail).subscribe((users:any)=>{
      this.loader = false;
      for(var i = 0; i< users.data.length; i++){
        this.datafilter(users.data[i])
      }
    });

    formData.append("id", this.route.snapshot.params.id);
    this.http.post(`${apiserverurl}getGroupName/`, formData ).subscribe(r=>{
      this.groupnamedata = r;
      this.groupname = this.groupnamedata.data[0].groupName
    })

    this.myfullname(localStorage.getItem("username"));

  }

  myfullname(email:any){
    const formData = new FormData(); 
    formData.append("email", email);
    this.http.post(`${apiserverurl}getContactName/`, formData ).subscribe(r=>{
      this.userArray1 = r;
      this.myname = this.userArray1.data[0].name;
    })
  }

}
