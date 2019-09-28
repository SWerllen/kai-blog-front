import { Component, OnInit } from '@angular/core';
import {UserManageService} from '../../service/user-manage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private userManager:UserManageService,
    private router:Router
  ){
    this.userManager.checkState().subscribe(res=>{
      console.log(res.data.username);
    })
  }

  onSignOut() {
    this.userManager.signOut().subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('/');
      this.ngOnInit();
    })
  }

  ngOnInit(): void {

  }
}
