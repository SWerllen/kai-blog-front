import { Component, OnInit } from '@angular/core';
import {Article} from '../../class/article';
import {ArticleService} from '../../service/article.service';
import {ActivatedRoute} from '@angular/router';

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
    this.route.paramMap.subscribe(params => {
      this.articleService.getArticle(+params.get('id')).subscribe(res=>{
        if(!res.success){
          console.log("加载失败");
          return;
        }
        this.article=res.data;
      })
    });

  }

}
