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

  tags:Tag[] = [];

  constructor(
    private http:HttpClient
  ) { }

  getTags(){
    return this.http.get<TagsMessage>(Url.tag,{withCredentials:true}).pipe(
      catchError(ErrorHandleService.handleError<TagsMessage>('getTags',new TagsMessage())),
      tap(res=>{
        console.log(res);
        if(res.success){
          this.tags=res.data;
        }
      })
    )
  }

  addTags(tag){
    const option = {
      header:new HttpHeaders({
        type:'application/json'
      }),
      withCredentials:true
    }
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

}
