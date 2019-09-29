import { Component, OnInit } from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  scrollPos=0;

  constructor() { }

  ngOnInit() {
    scrollTo(0,this.scrollPos);
  }

}
