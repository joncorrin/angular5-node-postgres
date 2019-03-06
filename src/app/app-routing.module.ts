import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './users/login/login.component';
import {SignupComponent} from "./users/signup/signup.component";

const appRoutes: Routes = [
  { path: '',pathMatch: 'full', redirectTo: 'signup'},
  { path: 'signup', component: SignupComponent},
  { path: 'authorize', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
