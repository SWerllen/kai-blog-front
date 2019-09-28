import { Component, OnInit } from '@angular/core';
import { RegisterService} from '../../service/register.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {User} from '../../class/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private checkoutForm;
  private checkInputSubject:Subject<any>=new Subject<any>();
  private checkUsernameSubject:Subject<String>=new Subject<String>();
  private isRight:boolean;
  private user:User=new User();
  private myCheckList={
    username_exist:{able:true,message:"该用户名已注册"},
    username_format:{able:true,message: "用户名必须以字母开头，6-16个英文字符，数字或下划线！"},
    password:{able:true,message:"口令必须8-20个字符，英文字符，数字，下划线或特殊符号！"},
    pass_rpt:{able:true,message:"重复口令：必须和口令一致！"},
    email:{able:true,message:"请输入正确邮箱格式"}
  }
  constructor(
    private registerService : RegisterService,
    private router:Router
  ) { }

  ngOnInit() {
    this.checkUsernameSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((username)=>{
        return this.registerService.checkUsernameExist(username);
      })
    ).subscribe(res=>{
      this.myCheckList.username_exist.able=res.success;
    });
  }

  onUsernameInput(username){
    this.checkUsernameSubject.next(username);
    this.myCheckList.username_format.able=this.registerService.checkUsername(username)
  }

  onPasswordInput(password){
    this.myCheckList.password.able=this.registerService.checkPassword(password);
  }

  onPassRPTInput(password,pass_rpt){
    this.myCheckList.pass_rpt.able=(password==pass_rpt);
  }

  onEmailInput(email){
    this.myCheckList.email.able=email.validity.valid;
  }

  onSubmit(){
    for(let key in this.user){
      if(this.user[key]===''){
        alert('您有某些项目未填哦！');
        return;
      }
    }
    for(var key in this.myCheckList){
      if(!this.myCheckList[key].able){
        alert(this.myCheckList[key].message);
        return;
      }
    }
    this.registerService.register(this.user).subscribe(res=>{
      console.log(res.success);
      if(res.success){
        this.router.navigateByUrl("signin");
      }
      else{
        alert(res.info);
      }
    })
  }

}
