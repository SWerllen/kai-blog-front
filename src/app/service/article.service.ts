import { Injectable } from '@angular/core';
import {Article} from '../class/article';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Url} from '../config/url.enum';
import {catchError, map, tap} from 'rxjs/operators';
import {ErrorHandleService} from './error-handle.service';
import {ArticlesMessage} from '../class/articles-message';
import {Observable, of} from 'rxjs';
import {ArticleDetailMessage} from '../class/article-detail-message';
import {NormalMessage} from '../class/normal-message';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles:Article[]=new Array();

  constructor(
    private http:HttpClient
  ) {

  }

  getArticles(size=undefined,page=undefined){
    console.log(`获取文章 ${size} of ${page}`)
    return this.http.get<ArticlesMessage>(Url.article,{params:{size:size,page:page}}).pipe(
      catchError(ErrorHandleService.handleError('getArticles',new ArticlesMessage(false,"获取文章时出现了错误",[],0))),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.articles = res.data;
        }
      })
    )
  }

  deleteArticle(id:number){
    const postOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials:true
    }
    return this.http.delete<NormalMessage>(`${Url.article}${id}`,postOption).pipe(
      catchError(ErrorHandleService.handleError('postArticle', new NormalMessage(false,"删除失败")))
    );
  }

  getArticle(id: number){
    return this.http.get<ArticleDetailMessage>(`${Url.article}${id}`).pipe(
      catchError(ErrorHandleService.handleError('getArticle',new ArticleDetailMessage(false,"获取文章时出现了错误",new Article())))
    )
  }


  updateArticle(article:Article){
    const postOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials:true
    }
    return this.http.put<NormalMessage>(Url.article+article.id, article, postOption).pipe(
      catchError(ErrorHandleService.handleError('postArticle', {success: false, message: "出现了点问题！"}))
    );
  }

  postArticle(article:Article){
    const postOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials:true
    }
    return this.http.post<NormalMessage>(Url.article, article, postOption).pipe(
      catchError(ErrorHandleService.handleError('postArticle', {success: false, message: "出现了点问题！"})),
      tap(res=>console.log)
    );
  }

  getMore(size,page) {
    return this.http.get<ArticlesMessage>(Url.article,{params:{size:size,page:page}}).pipe(
      catchError(ErrorHandleService.handleError('getArticles',new ArticlesMessage(false,"获取文章时出现了错误",[],0))),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.articles=this.articles.concat(res.data);
        }
      })
    )
  }
}
