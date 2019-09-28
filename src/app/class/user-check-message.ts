import {User} from './user';
import {NormalMessage} from './normal-message';

export class UserCheckMessage extends NormalMessage{
  constructor(
    success:boolean=false,
    info:string="用户状态查询出错",
    public data:User=new User()   //查询后返回对应用户信息
  ){
    super(success,info);
  }
}
