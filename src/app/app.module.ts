import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatsComponent } from './chats/chats.component';

import { FormsModule } from '@angular/forms';
import { PersonalComponent } from './personal/personal.component';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { RegisterComponent } from './register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MycontactsComponent } from './mycontacts/mycontacts.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

import { HttpClientModule } from '@angular/common/http';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { ViewerComponent } from './viewer/viewer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { SelectcontactComponent } from './selectcontact/selectcontact.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { Fileupload2Component } from './fileupload2/fileupload2.component';
import { Viewer2Component } from './viewer2/viewer2.component';
import { AddgroupmemberComponent } from './addgroupmember/addgroupmember.component';
import { GroupinformationComponent } from './groupinformation/groupinformation.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LinkPipe } from './link.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';



@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    PersonalComponent,
    RegisterComponent,
    MycontactsComponent,
    FileuploadComponent,
    ScrollToBottomDirective,
    ViewerComponent,
    CreategroupComponent,
    SelectcontactComponent,
    ChatroomComponent,
    Fileupload2Component,
    Viewer2Component,
    AddgroupmemberComponent,
    GroupinformationComponent,
    LinkPipe,
    MobileHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    Ng2SearchPipeModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }