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

const routes: Routes = [
  { path: '',   redirectTo: 'register', pathMatch: 'full' },
  { path: 'personal/:email' , component:PersonalComponent, canActivate:[EmailGuard]},
  { path: 'gpchatroom/:id', component:ChatroomComponent, canActivate:[EmailGuard]},
  { path: 'addgroupmember/:id', component:AddgroupmemberComponent, canActivate:[EmailGuard]},
  { path: 'register' , component:RegisterComponent},
  { path: 'mycontacts', component:MycontactsComponent, canActivate:[EmailGuard]},
  { path: 'upload', component:FileuploadComponent, canActivate:[EmailGuard]},
  { path: 'upload2', component:Fileupload2Component, canActivate:[EmailGuard]},
  { path: 'view', component:ViewerComponent, canActivate:[EmailGuard]},
  { path: 'view2', component:Viewer2Component, canActivate:[EmailGuard]},
  { path: 'create', component:CreategroupComponent, canActivate:[EmailGuard]},
  { path: 'SelectContact', component:SelectcontactComponent, canActivate:[EmailGuard]},
  { path: 'chats', component:ChatsComponent, canActivate:[EmailGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }