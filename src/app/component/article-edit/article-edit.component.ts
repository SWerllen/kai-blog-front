import { Component, OnInit } from '@angular/core';
import {Article} from '../../class/article';
import {ArticleService} from '../../service/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../../service/tag.service';
import {Tag} from '../../class/tag';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  article:Article=new Article();

  constructor(
    private articleService:ArticleService,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private tagService:TagService
  ) { }

  id:number=0;
  idEdit=false;

  async ngOnInit() {
    await this.activeRoute.paramMap.subscribe(async params=>{
      let id=params.get('id');
      console.log(id);
      if(id){
        await this.articleService.getArticle(+id).subscribe(res=>{
          this.article=res.data;
          console.log('是编辑状态');
          this.idEdit=true;
        });

      }
      this.tagService.getTags().subscribe(res=>{
      })
    })
  }

  onSubmit() {
    if(this.article.title.length==0||this.article.content.length==0){
      alert("标题和内容不能为空！");
      return ;
    }
    if(this.article.title.length>100){
      alert("标题太长了！");
      return ;
    }
    if(!this.idEdit){
      this.articleService.postArticle(this.article).subscribe(res=>{
        if(res['success']){
          alert("提交成功");
          this.router.navigateByUrl("article-list");
          this.article=new Article();
        }
        else{
          alert(res['info']);
        }
      })
    }else{
      this.articleService.updateArticle(this.article).subscribe(res=>{
        if(res['success']){
          alert("修改成功");
          this.router.navigateByUrl("article-list");
          this.article=new Article();
        }
        else{
          alert(res['info']);
        }
      })
    }
  }

  onReset() {
    this.article.title="";
    this.article.content="";
    this.article.target="";
    this.article.tags=new Array();
  }

  onAddTag(tag: Tag) {
    console.log(this.article);
    this.article.tags.push(tag);
  }

  onNewTag() {
    let name=prompt("请输入新建标签名称");
    this.tagService.addTags(new Tag(null,name,null)).subscribe();
  }

  deleteTag(tag: Tag) {
    this.article.tags.splice(this.article.tags.indexOf(tag),1);
  }
}
