export class NormalMessage{
  constructor(
    public success:boolean=false,
    public info:string="有问题",
    public data:any=undefined
  ){}
}
