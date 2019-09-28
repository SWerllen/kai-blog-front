import { Component, OnInit } from '@angular/core';
import {Article} from '../../class/article';
import {ArticleService} from '../../service/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../../service/tag.service';

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

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params=>{
      let id=params.get('id');
      console.log(id);
      if(id){
        this.articleService.getArticle(+id).subscribe(res=>{
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
    console.log(this.tagService.tags)
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
          alert("提交成功");
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
  }

  onAddTag() {

  }
}
