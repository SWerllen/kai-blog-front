import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../class/user';
import {Url} from '../config/url.enum';
import {ErrorHandleService} from './error-handle.service';
import {NormalMessage} from '../class/normal-message';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private http:HttpClient
  ) { }

  checkUsernameExist(username):Observable<NormalMessage>{
    console.log("check username");
    return this.http.get<NormalMessage>(`${Url.user}?username=${username}`).pipe(
      catchError(ErrorHandleService.handleError('checkUsername',new NormalMessage(false,"查询用户名是否重复时出现问题"))),
    );
  }

  checkUsername(username):boolean{
    var reg=/^[A-z][a-zA-Z0-9_]{5,15}$/;
    return !(username.length>16||username.length<6||!reg.test(username.toString()))
  }

  checkPassword(password):boolean{
    return !(password.length>20||password.length<8)
  }

  register(user:User){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<NormalMessage>(Url.user,user,httpOptions)
      .pipe(
      catchError(ErrorHandleService.handleError('checkUsername',new NormalMessage(false,"注册过程中出现问题")))
    )
  }
}
