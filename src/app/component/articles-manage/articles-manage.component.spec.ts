import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesManageComponent } from './articles-manage.component';

describe('ArticlesManageComponent', () => {
  let component: ArticlesManageComponent;
  let fixture: ComponentFixture<ArticlesManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
