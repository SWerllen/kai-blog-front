import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../service/article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-artical-list',
  templateUrl: './artical-list.component.html',
  styleUrls: ['./artical-list.component.css']
})
export class ArticalListComponent implements OnInit {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  page=1;
  size=5;
  targetId=0;
  constructor(
    private articleService : ArticleService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.articleService);
    this.activatedRoute.paramMap.subscribe(params=>{
      this.targetId = +params.get('id')
      console.log(this.targetId);
      if(this.targetId>1){
        this.articleService.getDividedArticles(this.size,this.page++,this.targetId).subscribe();
        return;
      }else{
        this.fresh();
      }
    });
  }

  fresh(){
    let obs = this.articleService.getArticles(this.size,this.page++);
    if(obs){
      obs.subscribe((res)=>{
        if(res.success) {
          console.log("刷新成功！");
        }
      },error => {
        console.error(error);
      });
    }
  }

  onScrollDown() {
    if(this.targetId<1){
      this.articleService.getMore(this.size,this.page++).subscribe(res=>{
        console.log(this.articleService.articles);
      })
    }else{
      this.articleService.getMoreDivided(this.size,this.page++,this.targetId).subscribe(res=>{
        console.log(this.articleService.articles);
      })
    }
  }x
}
