import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CreatPostComponent } from 'src/app/tools/creat-post/creat-post.component';
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {
  fireStore = new FirebaseTSFirestore();
  posts: postData[] = []
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
  }
  onCreatePostClick() {
    this.dialog.open(CreatPostComponent)
  }
  getPosts() {
    this.fireStore.getCollection({
      path: ['posts'],
      where: [
        new OrderBy('timestamp', 'desc'),
        new Limit(10)
      ],
      onComplete: (result) => {
        result.docs.forEach(
          doc => {
            let post = <postData>doc.data();
            this.posts.push(post)
          }
        )
      },
      onFail: err => {

      }
    })
  }
}
export interface postData {
  comment: string;
  creatorId: string;
  imageUrl?: string
}
