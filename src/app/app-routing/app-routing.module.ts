import { Routes, RouterModule } from '@angular/router';
import { AppComponent} from '../app.component';
import {APP_BASE_HREF} from '@angular/common';
import {NgModule} from '@angular/core';
import {RegisterComponent} from '../component/register/register.component';
import {SigninComponent} from '../component/signin/signin.component';
import {ArticalListComponent} from '../component/artical-list/artical-list.component';
import {ArticleComponent} from '../component/article/article.component';
import {ArticleEditComponent} from '../component/article-edit/article-edit.component';
import {BackManageComponent} from '../component/back-manage/back-manage.component';
import {MainContentComponent} from '../component/main-content/main-content.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'signin' ,component:SigninComponent},
  {path:  '', redirectTo: 'signin', pathMatch: 'full'},
  {path: 'article-list',component:MainContentComponent},
  {path: 'article/:id', component: ArticleComponent},
  {path:'article-edit',component:ArticleEditComponent},
  {path:'back-manage',component:BackManageComponent},
  {path:'article-edit/:id',component:ArticleEditComponent},
  {path:'divided/:id',component:MainContentComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:    [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule { }
