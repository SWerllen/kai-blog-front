import { Component, OnInit } from '@angular/core';
import {User} from '../../class/user';
import {UserManageService} from '../../service/user-manage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private user:User,
    private userService: UserManageService,
    public router: Router
  ) { }

  ngOnInit() {
    console.log("登陆界面初始化");
    this.userService.checkState().subscribe(res=>{
      if(res.success){
        console.log(res.info);
        this.router.navigateByUrl("article-list", ).then(res=>{
          console.log("跳转成功！");
        })
      }
    })
  }
  onSubmit(){
    console.log("check");
    if(this.user.username==''&&this.user.password==''){
      alert("请输入");
      return;
    }
    this.userService.signin(this.user).subscribe(res=>{
      console.log(res);
      if(res['success']){
        this.router.navigateByUrl("article-list", ).then(res=>{
          console.log("跳转成功！");
        })
        alert(res['message']);
      }
      else {
        alert(res['message']);
      }
    })
  }
}
