import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackManageComponent } from './back-manage.component';

describe('BackManageComponent', () => {
  let component: BackManageComponent;
  let fixture: ComponentFixture<BackManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
