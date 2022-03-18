import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReceiveService } from '../services/receive.service';
import { apiserverurl, baseUrl, socketserverurl } from 'src/environments/environment.prod';
import { TransferService } from '../services/transfer.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  term:any;
  searchText: any;
  loader:any;
  homechadata:any = [];
  filtered:any = [];
  finaldata:any = [];
  final:any = [];
  newData:any = [];
  newData1:any = [];
  newData2:any = [];
  socket:any;
  unseencount:any;
  unseencount1:any;


  constructor(private route:ActivatedRoute, private transfer : TransferService, private routeDirect: Router,private routeReverse:Router, private http: HttpClient, private receive: ReceiveService ) { }
  
  ngOnInit(): void {
    console.log(localStorage.getItem("user_id"))
    this.socket = io(`${socketserverurl}`);      
    this.socket.emit('connected_All',localStorage.getItem("user_id"));
    this.socket.on('getHomeData', (data:any)=>{
      this.final = [];
      this.homechadata = [];
      this.filtered = [];
      this.finaldata = [];
      setTimeout(()=>{
        this.setHomedata();
      }, 200);      
    })
    this.setHomedata();
    this.loader = true;
    if(window.innerWidth < 700){
      this.routeDirect.navigate(['mobileview']);
    }

  }

  setHomedata(){
    
    this.receive.getGroups(localStorage.getItem("user_id")).subscribe(response=>{
      this.loader = false;
      for (let i = 0; i < response.data.length; i++){
        const formData = new FormData(); 
        formData.append("email", response.data[i].groupTableId);
        this.http.post(`${apiserverurl}home/`, formData ).subscribe(r=>{
          this.newData1 = r;
          this.mapper(this.newData1.data[0], localStorage.getItem("user_id"))
        })
      }
    })


    this.receive.getHomeData(localStorage.getItem("user_id")).subscribe(responce=>{
      this.loader = false;
      for (let i = 0; i<responce.data.length; i++) {
        if(responce.data[i].sender != localStorage.getItem("user_id") ){
          const d = new Date();
          let year: string;
          if(d.getFullYear() != responce.data[i].chatdate.year){
            year = responce.data[i].chatdate.year;
          }else{
            year = "";
          }
          let date = responce.data[i].chatdate.dayOfMonth+" "+responce.data[i].chatdate.month.substring(0, 3).toLowerCase()+" "+year;
          this.homechadata.push({'id':responce.data[i].id,'entity':responce.data[i].sender,'message':responce.data[i].message,'time':responce.data[i].time,'type':responce.data[i].type,'me':'false', 'date':date, 'seen':responce.data[i].seen, 'myemail': localStorage.getItem("user_id"), 'entityType':responce.data[i].entityType})
        }
        if(responce.data[i].receiver != localStorage.getItem("user_id") ){
          const d = new Date();
          let year: string;
          if(d.getFullYear() != responce.data[i].chatdate.year){
            year = responce.data[i].chatdate.year;
          }else{
            year = "";
          }
          let date = responce.data[i].chatdate.dayOfMonth+" "+responce.data[i].chatdate.month.substring(0, 3).toLowerCase()+" "+year;
          this.homechadata.push({'id':responce.data[i].id,'entity':responce.data[i].receiver,'message':responce.data[i].message,'time':responce.data[i].time,'type':responce.data[i].type,'me':'true', 'date':date, 'seen':responce.data[i].seen, 'myemail': localStorage.getItem("user_id"), 'entityType':responce.data[i].entityType})
        }
      }
      for(var i=0; i<this.homechadata.length; i++){
        this.filtered.push(this.homechadata[i].entity)
      }
      let uniqueChars = [new Set(this.filtered)];
      uniqueChars[0].forEach(element => {
        let ans = this.filtered.indexOf(element);
        this.finaldata.push(this.homechadata[ans])
      });
      for (let x = 0; x < this.finaldata.length; x++) {

        if(this.finaldata[x].entityType == 'personal'){
          this.newData = [];              
          this.http.get(`${baseUrl}companyRegistration/`+this.finaldata[x].entity).subscribe(r=>{

            
            let me;
            if(this.finaldata[x].me == 'true'){
              me = 'true';
            }else{
              me = 'false'
            }
            let hour = this.finaldata[x].time.substring(0, 2);
            let min = this.finaldata[x].time.substring(3, 5);
            let timezone = this.finaldata[x].time.substring(9, 11);
            let time;
            if(hour.substring(0, 1) == 0){
              time = hour.substring(1, 2)+":"+min+" "+timezone;
            }else{
              time = hour.substring(0, 2)+":"+min+" "+timezone;
            }
            this.newData = r;

            let fullname = this.newData.content[0].firstName+" "+this.newData.content[0].lastName;
            
            this.finalArray(this.finaldata[x].entity,this.finaldata[x].myemail,fullname,this.finaldata[x],time,this.finaldata[x].date,me,'this.newData.data.profilePicture');

          })

        }
      }
    })
  }

  mapper(alldata:any, myEmail:any){
    const formData1 = new FormData();
    formData1.append("id", alldata.receiver);
    this.http.post(`${apiserverurl}getGroupName/`, formData1 ).subscribe(r=>{

      if(alldata.entityType == 'group'){
        this.newData2 = r;
        let me;
        if(alldata.sender == localStorage.getItem("user_id")){
          me = 'true'
        }else{
          me = 'false'
        }
        let date = alldata.chatdate.dayOfMonth+" "+alldata.chatdate.month.substring(0, 3).toLowerCase();

        let hour = alldata.time.substring(0, 2);
        let min = alldata.time.substring(3, 5);
        let timezone = alldata.time.substring(9, 11);
        let time;
        if(hour.substring(0, 1) == 0){
          time = hour.substring(1, 2)+":"+min+" "+timezone;
        }else{
          time = hour.substring(0, 2)+":"+min+" "+timezone;
        }
        this.finalArrayofGroup(alldata, date, time, this.newData2.data[0].groupName, myEmail, me)
      }

    })

  }

  finalArray(email1:any,email2:any,name:any,data:any,time:any,date:any,me:any,profilepic:any){
    const formData = new FormData(); 
    formData.append("sender", email1);
    formData.append("receiver", email2);
    this.http.post(`${apiserverurl}unseenmsagecount/`, formData ).subscribe(r=>{
      this.unseencount = [];
      this.unseencount = r;
      this.final.push(
        {
          'id':data.id,
          'entity': name, 
          'email':data.entity,
          'message':data.message,
          'time':time,
          'type':data.type,
          'entitytype':'personal',
          'me':me, 
          'date':data.date,
          'profilePic':profilepic,
          'seen':data.seen,
          'unSeenCount': this.unseencount.data.length
        }
      )
    })
  }

  finalArrayofGroup(dataArry:any, date:any, time:any, group_name:any, myEmail:any, me:any){

    const formData = new FormData(); 
    formData.append("receiver", dataArry.receiver);
    formData.append("email", myEmail);
    formData.append("status", myEmail);
    this.http.post(`${apiserverurl}receivegroupunseenmessage/`, formData ).subscribe(r1=>{
      this.unseencount1 = [];
      this.unseencount1 = r1;
      let data = {
        'id': dataArry.id,
        'entity': group_name,
        'GroupId': dataArry.receiver,
        'entitytype': "group",
        'me': me,
        'message': dataArry.message,
        'time': time,
        'type': dataArry.type,
        'email': "",
        'date' :date,
        'unSeenCount' :this.unseencount1.data.length
      }
      this.final.push(data)
    })
  }

  /* Update Home data when user click on chat list item */
  update(id:any){    
    setTimeout(()=>{
      for(let i = 0; i< this.final.length; i++){
        if(this.final[i].email == id){
          this.final[i].unSeenCount = 0;
        }
      }
    }, 300);
  }

  update1(id:any){    
    setTimeout(()=>{
      for(let i = 0; i< this.final.length; i++){
        console.log(this.final[i])
        if(this.final[i].GroupId == id){
          this.final[i].unSeenCount = 0;
        }
      }
    }, 300);
  }
  

  get sortData() {
    return this.final.sort((a:any, b:any) => {
      return <any>b.id - <any>a.id;
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

}