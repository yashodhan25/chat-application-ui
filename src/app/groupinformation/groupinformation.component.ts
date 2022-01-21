import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiserverurl } from 'src/environments/environment.prod';

@Component({
  selector: 'app-groupinformation',
  templateUrl: './groupinformation.component.html',
  styleUrls: ['./groupinformation.component.scss']
})
export class GroupinformationComponent implements OnInit {

  // Group Id
  group_id:any = this.route.snapshot.params.id;

  // Group Name
  group_name:any; 

  // Group Create Date
  group_create_date:any
  
  // No of Participants
  no_of_participants:any; 

  // All Participant Information
  participant_info:any = [];

  constructor(private route:ActivatedRoute, private http: HttpClient) { }

  start:any;
  groupname_Array:any = [];
  group_admin_email:any
  group_information_Array:any;
  group_member_name_array:any;
  group_member_name:any;
  group_member_email:any;

  ngOnInit(): void {
    this.start = true;

    console.log(this.participant_info)

    const formData = new FormData(); 
    formData.append("id", this.route.snapshot.params.id);
    this.http.post(`${apiserverurl}getGroupName/`, formData ).subscribe(response=>{
      this.groupname_Array = response;
      this.group_name = this.groupname_Array.data[0].gpTableDate
      this.group_create_date = this.groupname_Array.data[0].gpTableDate.dayOfMonth+"/"+this.groupname_Array.data[0].gpTableDate.monthValue+"/"+this.groupname_Array.data[0].gpTableDate.year
      this.group_name = this.groupname_Array.data[0].groupName;
      this.group_admin_email = this.groupname_Array.data[0].createdByUserEmail;

      console.log("Group Name : "+this.group_name+"\nAdmin Email : "+this.group_admin_email)

      console.log(this.group_create_date)
      
      this.GroupInformation(this.route.snapshot.params.id, this.group_admin_email)
    })

  }

  GroupInformation(Group_Id:any,admin_email:any){
    const formData = new FormData(); 
    formData.append("id", Group_Id);
    this.http.post(`${apiserverurl}getGroupDetailsById/`, formData ).subscribe(response=>{
      this.group_information_Array = response;
      this.no_of_participants = this.group_information_Array.data.length;
      
      console.log(this.no_of_participants)
      
      for(var i = 0; i<this.group_information_Array.data.length; i++){
        this.group_member_email = this.group_information_Array.data[i].userEmail
        this.group_participant_info(this.group_member_email,admin_email)
      }
    })
  }

  group_participant_info(user_email:any, admin_email:any){
    const formData = new FormData();
    formData.append("email", user_email);
    this.http.post(`${apiserverurl}getContactName/`, formData ).subscribe(r=>{
      this.start = false
      this.group_member_name_array = r;
      this.group_member_name = this.group_member_name_array.data[0].name;
      let admin;
      if(user_email == admin_email){
        admin = 'true'
      }else{
        admin = 'false'
      }
      let data = {'name':this.group_member_name, 'Email':user_email, 'Admin':admin}
      this.participant_info.push(data)
    })
  }

}