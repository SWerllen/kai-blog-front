import { Component, OnInit } from '@angular/core';
import {Article} from '../../class/article';
import {ArticleService} from '../../service/article.service';
import {ActivatedRoute} from '@angular/router';
import {timeout, timeoutWith} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article:Article=new Article();
  constructor(
    private articleService:ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id=+params.get('id');
      await this.articleService.getArticle(id).subscribe(async res=>{
        if(!res.success){
          console.log("加载失败");
          return;
        }
        this.article=res.data;
        await this.articleService.addClick(id).subscribe(res=>{
          if(res){
            this.article.clicktime=res;
          }
        })
      })
    });
  }

}
