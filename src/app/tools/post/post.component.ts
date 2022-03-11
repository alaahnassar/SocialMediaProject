import { Component, Input, OnInit } from '@angular/core';
import { postData } from 'src/app/pages/post-feed/post-feed.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
@Input() postData:postData | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
