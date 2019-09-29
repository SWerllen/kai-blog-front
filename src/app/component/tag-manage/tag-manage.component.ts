import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {ArticleService} from '../../service/article.service';
import {Router} from '@angular/router';
import {Tag} from '../../class/tag';
import {TagService} from '../../service/tag.service';

@Component({
  selector: 'app-tag-manage',
  templateUrl: './tag-manage.component.html',
  styleUrls: ['./tag-manage.component.css']
})
export class TagManageComponent implements OnInit {
  data: Tag[]=[];

  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;
  pageSize = 10;
  constructor(
    private tagService:TagService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.onPage(this.pageSize,1);
  }

  onPage(size,page) {
    this.isLoadingResults = true;
    this.tagService.getTags(size,page).subscribe(res=>{
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.data=res.data;
      console.log(this.data);
      this.paginator.length = res.results_length;
    },error => {
      this.isLoadingResults = false;
      // Catch if the GitHub API has reached its rate limit. Return empty data.
      this.isRateLimitReached = true;
    })
  }

  onEdit(id: number) {
    let newName = prompt("请输入");
    this.tagService.updateTag(id,newName).subscribe(res=>{
      if(res.success){
        alert('修改成功！');
        this.onPage(this.pageSize,this.paginator.pageIndex+1);
      }
    })
  }

  onDelete(id: number) {
    let isDelete= confirm("是否删除？");
    if(!isDelete) return;
    this.tagService.deleteTag(id).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.onPage(this.pageSize,this.paginator.pageIndex+1);
      }else{
        alert(res.info);
      }
    })
  }
}
