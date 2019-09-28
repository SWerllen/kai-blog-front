import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Url} from '../config/url.enum';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ErrorHandleService} from './error-handle.service';
import {User} from '../class/user';
import {ArticlesMessage} from '../class/articles-message';
import {NormalMessage} from '../class/normal-message';
import {UserCheckMessage} from '../class/user-check-message';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {
  user:User=null;
  constructor(
    private http: HttpClient
  ) {}

  //检查目前浏览器的登陆状态
  checkState(){
    console.log("开始查询浏览器登录信息");
    let options = {
      headers: new HttpHeaders(),
      withCredentials:true
    };
    return this.http.post<UserCheckMessage>(Url.state,{},options).pipe(
      catchError(ErrorHandleService.handleError('signin', new UserCheckMessage(false,"未登录",null))),
      tap(res=>{
        console.log(res);
        if(res.success)
          this.user=res.data;
      })
    )
  }

  signin(user) {
    const postOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials:true
    }
    return this.http.post<NormalMessage>(Url.signin, user, postOption).pipe(
      catchError(ErrorHandleService.handleError('signin', new NormalMessage())),
      tap(res=>{if(res.success){this.user=user;}})
    );
  }

  signOut() {
    const postOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials:true
  }
    return this.http.post<NormalMessage>(Url.signout, {}, postOption).pipe(
      catchError(ErrorHandleService.handleError('signout', new NormalMessage())),
      tap(res=>{if(res.success){this.user=null}})
    );
  }
}
