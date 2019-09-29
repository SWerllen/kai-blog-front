import { Component, OnInit } from '@angular/core';
import {TagService} from '../../service/tag.service';
import {Article} from '../../class/article';
import {ArticleService} from '../../service/article.service';
import {Tag} from '../../class/tag';
import {UserManageService} from '../../service/user-manage.service';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.css']
})

export class RightSideComponent implements OnInit {
  hottest:Article[] = [];
  tags:Tag[] = [];
  constructor(
    private tagService:TagService,
    private articleService:ArticleService,
    private userService:UserManageService
  ) { }

  ngOnInit() {
    this.tagService.getTagsAnonymous().subscribe(res=>{
      if(res.success){
        this.tags=res.data;
      }
    });
    this.tagService.getTags().subscribe();
    this.articleService.getHottest().subscribe(res=>{
      if(res.success){
        this.hottest=res.data;
      }
    })
  }

}
