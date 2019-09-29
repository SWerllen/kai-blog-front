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

  articles:Array<Article> =new Array();

  constructor(
    private http:HttpClient
  ) {

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
      catchError(ErrorHandleService.handleError('postArticle', {success: false, message: "连接出现了点问题！"})),
      tap(res=>console.log)
    );
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

  getMore(size,page) {
    return this.http.get<ArticlesMessage>(Url.article,{params:{size:size,page:page}}).pipe(
      catchError(ErrorHandleService.handleError('getArticles',new ArticlesMessage(false,"获取文章时连接出现了错误",[],0))),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.articles=this.articles.concat(res.data);
        }
      })
    )
  }

  getOwnArticles(size=undefined,page=undefined) {
    console.log(`获取文章 ${size} of ${page}`)
    return this.http.get<ArticlesMessage>(Url.ownarticle,{params:{size:size,page:page},withCredentials:true}).pipe(
      catchError(ErrorHandleService.handleError('getArticles',new ArticlesMessage(false,"获取文章时出现了错误",[],0))),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.articles = res.data;
        }
      })
    )
  }

  getDividedArticles(size=undefined,page=undefined,target=0) {
    console.log(`获取文章 ${size} of ${page}`)
    return this.http.get<ArticlesMessage>(Url.divided+target,{params:{size:size,page:page},withCredentials:true}).pipe(
      catchError(ErrorHandleService.handleError('getArticles',new ArticlesMessage(false,"获取文章时出现了错误",[],0))),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.articles = res.data;
        }
      })
    )
  }

  getMoreDivided(size=undefined,page=undefined,target=0) {
    console.log(`获取文章 ${size} of ${page}`)
    return this.http.get<ArticlesMessage>(Url.divided+target,{params:{size:size,page:page},withCredentials:true}).pipe(
      catchError(ErrorHandleService.handleError('getArticles',new ArticlesMessage(false,"获取文章时出现了错误",[],0))),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.articles=this.articles.concat(res.data);
        }
      })
    )
  }

  getHottest(){
    return this.http.get<ArticlesMessage>(Url.hottest).pipe(
      catchError(ErrorHandleService.handleError('getArticles',new ArticlesMessage(false,"获取热门文章时出现了错误",[],0))),
      tap(res=>{
        console.log(res);
      })
    )
  }

  addClick(num: number) {
    return this.http.post<NormalMessage>(`${Url.addclick}${num}`,{},{withCredentials:true}).pipe(
      catchError(ErrorHandleService.handleError<NormalMessage>('addClick',new NormalMessage(false,"增加点击量时连接出现了错误"))),
      map(res=>{
        console.log(res);
        if(res.success){
          return res.data;  //目前点击量
        }
      })
    )
  }


}
