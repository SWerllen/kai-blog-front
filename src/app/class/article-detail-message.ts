import {Article} from './article';

export class ArticleDetailMessage {
  constructor(
    public success:boolean=false,
    public info:string="有问题",
    public data:Article=new Article()
  ){}
}
