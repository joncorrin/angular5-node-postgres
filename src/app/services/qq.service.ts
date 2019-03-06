import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class QQService {
  apiUrl = environment.apiUrl + '/qq/server';

  constructor(
    private http: HttpClient
  ) { }

  authorize() {
    const token: string = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.apiUrl + '/authorize' + token, {});
  }

}
