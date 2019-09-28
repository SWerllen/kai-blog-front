import {NormalMessage} from './normal-message';
import {Tag} from './tag';

export class TagsMessage extends NormalMessage {
  constructor(
    success:boolean=false,
    info:string="获取标签出错",
    public data:Tag[]=[]
  ){
    super(success,info)
  }
}
