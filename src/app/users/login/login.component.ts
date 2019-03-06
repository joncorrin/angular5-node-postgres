import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../user.model";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QQService } from '../../services/qq.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  disableLogin = false;
  loading = false;
  user = new User(null, null, null);
  pwd_clicked = false;
  password = null;
  queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

  constructor(
      private userService: UserService,
      private qqService: QQService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {
  }

  login() {
      this.loading = true;
      this.disableLogin = true;
      if (this.user.email !== null && this.user.email !== '' &&
          this.user.password !== null && this.user.password !== '' && 
          this.user.password === this.password) {
            this.userService.signup(this.user)
              .subscribe(user => {
                this.userService.login(this.user)
                    .subscribe(user => {
                        this.loading = false;
                        localStorage.setItem('token', user['token']);
                        this.disableLogin = false;
                        localStorage.setItem('userId', user['userId']);
                        this.qqService.authorize()
                          .subscribe((url:any) => {
                            alert('Authorization Successful');
                            window.location = url;
                            this.disableLogin = false;
                          }, error => {
                            alert('Authorization Successful CODE:3');
                            console.log(error);
                            this.disableLogin = false;
                          });
                    }, error => {
                        this.loading = false;
                        console.log(error);
                        this.disableLogin = false;
                        alert('Error Authorizing CODE:2');
                    });
              }, error => {
                console.log(error);
                alert('Error Authorizing CODE:1');
                this.disableLogin = false;
              });
              
      } else {
          this.loading = false;
          this.disableLogin = false;
          alert('Username or Password Is Incorrect');
      }
  }

  change_border(){
      if(this.pwd_clicked === true){
          return "solid 1px #7c7fff";
      } else if(this.pwd_clicked === false) {
          return "solid 1px #cccccc";
      }
  }
}
