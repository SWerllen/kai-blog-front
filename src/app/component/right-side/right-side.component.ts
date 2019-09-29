import { Component, OnInit } from '@angular/core';
import {TagService} from '../../service/tag.service';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.css']
})

export class RightSideComponent implements OnInit {

  constructor(
    private tagService:TagService
  ) { }

  ngOnInit() {
    this.tagService.getTags();
  }

}
