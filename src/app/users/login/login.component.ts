import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User(null,null);

  constructor(
    private UserService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    this.UserService.login(this.user)
      .subscribe(user => {
        localStorage.setItem('token', user['token']);
        localStorage.setItem('userId', user['userId']);
        alert('Login Successful');
      }, error => {
        console.log(error);
        alert('Error logging in. Try again');
      });
  }



}
