import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {LoginComponent} from "../users/login/login.component";
import {SignupComponent} from "../users/signup/signup.component";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ]
})
export class CoreModule { }
