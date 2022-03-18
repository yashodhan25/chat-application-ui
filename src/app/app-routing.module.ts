import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { EmailGuard } from './email.guard';
import { PersonalComponent } from './personal/personal.component';
import { RegisterComponent } from './register/register.component';
import { MycontactsComponent } from './mycontacts/mycontacts.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { ViewerComponent } from './viewer/viewer.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { SelectcontactComponent } from './selectcontact/selectcontact.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { Fileupload2Component } from './fileupload2/fileupload2.component';
import { Viewer2Component } from './viewer2/viewer2.component';
import { AddgroupmemberComponent } from './addgroupmember/addgroupmember.component';
import { GroupinformationComponent } from './groupinformation/groupinformation.component';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';
import { PesonalchatComponent } from './pesonalchat/pesonalchat.component';

const routes: Routes = [
  { path: '',   redirectTo: 'register', pathMatch: 'full' },
  { path: 'personal/:email' , component:PersonalComponent},
  { path: 'gpchatroom/:id', component:ChatroomComponent},
  { path: 'register' , component:RegisterComponent},
  { path: 'mycontacts', component:MycontactsComponent},
  { path: 'mobileview', component:MobileHomeComponent},
  { path: 'view', component:ViewerComponent},
  { path: 'view2', component:Viewer2Component},
  { path: 'upload', component:FileuploadComponent},
  { path: 'upload2', component:Fileupload2Component},
  { path: 'addgroupmember/:id', component:AddgroupmemberComponent},
  { path: 'groupinformation/:id', component:GroupinformationComponent},
  { path: 'create', component:CreategroupComponent},
  { path: 'SelectContact', component:SelectcontactComponent},
  { path: 'personalchat/:email', component:PesonalchatComponent},
  { path: 'chats', component:ChatsComponent,
          children: [
            { path: 'personal/:email' , component:PersonalComponent},
            { path: 'gpchatroom/:id', component:ChatroomComponent},
            { path: 'groupinformation/:id', component:GroupinformationComponent},
            { path: 'upload2', component:Fileupload2Component},
            { path: 'upload', component:FileuploadComponent},
            { path: 'view', component:ViewerComponent},
            { path: 'view2', component:Viewer2Component},
            { path: 'create', component:CreategroupComponent},
            { path: 'SelectContact', component:SelectcontactComponent},
            { path: 'addgroupmember/:id', component:AddgroupmemberComponent}
          ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }