import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReceiveService } from '../services/receive.service';
import { apiserverurl, socketserverurl } from 'src/environments/environment.prod';
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

  constructor(private route:ActivatedRoute, private transfer : TransferService, private routeDirect: Router,private routeReverse:Router, private http: HttpClient, private receive: ReceiveService ) { }

  ngOnInit(): void {
    this.socket = io(`${socketserverurl}`);      
    this.socket.emit('connected_All',localStorage.getItem("username"));
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
    this.receive.getGroups(localStorage.getItem("username")).subscribe(response=>{
      this.loader = false;
      for (let i = 0; i < response.data.length; i++){
        const formData = new FormData(); 
        formData.append("email", response.data[i].groupTableId);
        this.http.post(`${apiserverurl}home/`, formData ).subscribe(r=>{
          this.newData1 = r;
          this.mapper(this.newData1.data[0])
        })
      }
    })
    this.receive.getHomeData(localStorage.getItem("username")).subscribe(responce=>{
      this.loader = false;
      for (let i = 0; i<responce.data.length; i++) {
        if(responce.data[i].sender != localStorage.getItem("username") ){
          let date = responce.data[i].chatdate.dayOfMonth+" "+responce.data[i].chatdate.month.substring(0, 3).toLowerCase();
          this.homechadata.push({'id':responce.data[i].id,'entity':responce.data[i].sender,'message':responce.data[i].message,'time':responce.data[i].time,'type':responce.data[i].type,'me':'false', 'date':date, 'seen':responce.data[i].seen, 'myemail': localStorage.getItem("username")})
        }
        if(responce.data[i].receiver != localStorage.getItem("username") ){
          let date = responce.data[i].chatdate.dayOfMonth+" "+responce.data[i].chatdate.month.substring(0, 3).toLowerCase();
          this.homechadata.push({'id':responce.data[i].id,'entity':responce.data[i].receiver,'message':responce.data[i].message,'time':responce.data[i].time,'type':responce.data[i].type,'me':'true', 'date':date, 'seen':responce.data[i].seen, 'myemail': localStorage.getItem("username")})
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
        if(!(parseInt(this.finaldata[x].entity))){

          this.newData = [];
          const formData = new FormData(); 
          formData.append("email", this.finaldata[x].entity);          
          this.http.post(`${apiserverurl}getContactName/`, formData ).subscribe(r=>{
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
            this.newData.data[0].name;

            this.finalArray(this.finaldata[x].entity,this.finaldata[x].myemail,this.newData.data[0].name,this.finaldata[x],time,this.finaldata[x].date,me);
          })

        }
      }
    })
  }

  finalArray(email1:any,email2:any,name:any,data:any,time:any,date:any,me:any){
    const formData = new FormData(); 
    formData.append("sender", email1);
    formData.append("receiver", email2);
    this.http.post(`${apiserverurl}unseenmsagecount/`, formData ).subscribe(r=>{
      this.unseencount = [];
      this.unseencount = r;
      this.unseencount.data.length;
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
          'seen':data.seen,
          'unSeenCount': this.unseencount.data.length
        }
      )
    })
  }

  mapper(alldata:any){
    const formData1 = new FormData();
    formData1.append("id", alldata.receiver);
    this.http.post(`${apiserverurl}getGroupName/`, formData1 ).subscribe(r=>{
      this.newData2 = r;
      let me;
      if(alldata.sender == localStorage.getItem("username")){
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

      let data = {
        'id': alldata.id,
        'entity': this.newData2.data[0].groupName,
        'GroupId': alldata.receiver,
        'entitytype': "group",
        'me': me,
        'message': alldata.message,
        'time': time,
        'type': alldata.type,
        'email': "",
        'date' :date
      }
      this.final.push(data)
      // console.log(this.final)
    })
  }

  /* Update Home data when user click on chat list item */

  update(){
    this.final = [];
    this.homechadata = [];
    this.filtered = [];
    this.finaldata = [];
    this.setHomedata()
  }
  

  get sortData() {
    return this.final.sort((a:any, b:any) => {
      return <any>b.id - <any>a.id;
    });
  }

  logOut(){
    localStorage.clear();
    this.routeReverse.navigate(['register']);
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

}