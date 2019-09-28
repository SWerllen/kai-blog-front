import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../service/article.service';

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
  constructor(
    private articleService : ArticleService
  ) { }

  ngOnInit() {
    console.log(this.articleService)
    this.fresh();
  }

  fresh(){
    let obs = this.articleService.getArticles(this.size,this.page++);
    if(obs){
      // @ts-ignore
      obs.subscribe((res)=>{
        if(res.success) {
          console.log("刷新成功！");
        }
      },error => {
        console.error(error);
      });
    }
  }

  onShow() {
    console.log("出现了");
  }

  onScrollDown() {
    this.articleService.getMore(this.size,this.page++).subscribe(res=>{
      console.log(this.articleService.articles);
    })
  }
}
