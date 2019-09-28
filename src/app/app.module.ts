import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import {User} from './class/user';
import  {SigninComponent} from './component/signin/signin.component'
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { ArticalListComponent } from './component/artical-list/artical-list.component';
import { ArticleComponent } from './component/article/article.component';
import {Article} from './class/article';
import { ArticleEditComponent } from './component/article-edit/article-edit.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NavComponent } from './component/nav/nav.component';
import { BackManageComponent } from './component/back-manage/back-manage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ArticlesManageComponent } from './component/articles-manage/articles-manage.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule, MatFormFieldModule, MatProgressSpinnerModule} from '@angular/material';
import { MainContentComponent } from './component/main-content/main-content.component';
import { RightSideComponent } from './component/right-side/right-side.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TagManageComponent } from './component/tag-manage/tag-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    ArticalListComponent,
    ArticleComponent,
    ArticleEditComponent,
    NavComponent,
    BackManageComponent,
    ArticlesManageComponent,
    ArticlesManageComponent,
    MainContentComponent,
    RightSideComponent,
    TagManageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule
  ],
  providers: [User],
  bootstrap: [AppComponent]
})
export class AppModule { }
