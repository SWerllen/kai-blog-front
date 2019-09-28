import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ArticleService} from '../../service/article.service';
import {Article} from '../../class/article';
import {Router} from '@angular/router';


@Component({
  selector: 'app-articles-manage',
  templateUrl: './articles-manage.component.html',
  styleUrls: ['./articles-manage.component.css']
})
export class ArticlesManageComponent implements OnInit {
  titles: string[] = ['title', 'date'];
  data: Article[]=[];

  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;
  pageSize = 10;
  constructor(
    private articleService:ArticleService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.onPage(this.pageSize,1);
  }

  onPage(size,page) {
    this.isLoadingResults = true;
    this.articleService.getOwnArticles(size,page).subscribe(res=>{
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.data=res.data;
      console.log(this.data);
      this.paginator.length = res.results_length;
    },error => {
      this.isLoadingResults = false;
      // Catch if the GitHub API has reached its rate limit. Return empty data.
      this.isRateLimitReached = true;
    })
  }

  onEdit(id: number) {
    this.router.navigateByUrl('/article-edit/'+id);
  }

  onDelete(id: number) {
    let isDelete= confirm("是否删除？");
    if(!isDelete) return;
    this.articleService.deleteArticle(id).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.onPage(this.pageSize,this.paginator.pageIndex+1);
      }
    })
  }
}
