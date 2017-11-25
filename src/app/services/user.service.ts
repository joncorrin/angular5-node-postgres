import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  apiUrl = environment.apiUrl + '/user/server';

  constructor(
    private http: HttpClient
  ) { }

  signup(user) {
    return this.http.post(this.apiUrl + '/signup', user);
  }

  login(user) {
    return this.http.post(this.apiUrl + '/login', user);
  }

}
