import {Article} from './article';
import {NormalMessage} from './normal-message';

export class ArticlesMessage extends NormalMessage{
  constructor(
    success:boolean=false,
    info:string="文章获取时有问题",
    public data:Article[]=[],
    public results_length:number = 0
  ){
    super(success,info,data);
  }
}
