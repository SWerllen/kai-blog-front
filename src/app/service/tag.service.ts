import { Injectable } from '@angular/core';
import {Tag} from '../class/tag';
import {HttpClient} from '@angular/common/http';
import {Url} from '../config/url.enum';
import {catchError, tap} from 'rxjs/operators';
import {ErrorHandleService} from './error-handle.service';
import {TagsMessage} from '../class/tags-message';

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

}
