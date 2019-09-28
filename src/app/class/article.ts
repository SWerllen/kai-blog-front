import {User} from './user';
import {Tag} from './tag';

export class Article {
  constructor(
    public id:number=0,
    public title:string="",
    public target:string="",
    public date:Date=new Date(),
    public clicktime:number = 0,
    public content:string = "",
    public username:string="defaultname", //这是用户的用户名，和后台的存储有差别
    public tags:Tag[]=new Array()
  ){}
}
