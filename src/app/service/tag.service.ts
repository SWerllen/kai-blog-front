import { Injectable } from '@angular/core';
import {Tag} from '../class/tag';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Url} from '../config/url.enum';
import {catchError, tap} from 'rxjs/operators';
import {ErrorHandleService} from './error-handle.service';
import {TagsMessage} from '../class/tags-message';
import {NormalMessage} from '../class/normal-message';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tags:Array<Tag> = new Array();

  constructor(
    private http:HttpClient
  ) { }

  getTags(size=undefined,page=undefined){
    return this.http.get<TagsMessage>(Url.tag,{params:{size:size,page:page},withCredentials:true}).pipe(
      catchError(ErrorHandleService.handleError<TagsMessage>('getTags',new TagsMessage())),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.tags=res.data;
        }
      })
    )
  }

  getTagsAnonymous(){
    return this.http.get<TagsMessage>(Url.tag).pipe(
      catchError(ErrorHandleService.handleError<TagsMessage>('getTags',new TagsMessage())),
      tap(res=>{
        console.log(res);
      })
    )
  }

  addTags(tag){
    const option = {
      header:new HttpHeaders({
        type:'application/json'
      }),
      withCredentials:true
    };
    return this.http.post<TagsMessage>(Url.tag,tag,option).pipe(
      catchError(ErrorHandleService.handleError<TagsMessage>('addTags',new TagsMessage())),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.tags.push(res.data[0]);
        }
      })
    )
  }

  deleteTag(id:number){
    return this.http.delete<NormalMessage>(Url.tag+id,{withCredentials:true}).pipe(
      catchError(ErrorHandleService.handleError<NormalMessage>('addTags',new NormalMessage()))
    );
  }

  updateTag(id:number,newName){
    const options={
      header:new HttpHeaders({
        type:'application/json'
      }),
      withCredentials:true
    }
    return this.http.put<NormalMessage>(Url.tag+id,{name:newName},options).pipe(
      catchError(ErrorHandleService.handleError<NormalMessage>('addTags',new NormalMessage()))
    );
  }

}
