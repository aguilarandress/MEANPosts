import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from '../../services/post.service';

import Post from '../../models/Post';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css'],
})
export class PostsTableComponent implements OnInit {
  @Input() posts: Post[];

  constructor(
    private postService: PostService,
    private flashMessageService: FlashMessagesService,
    private routerService: Router
  ) {}

  ngOnInit(): void {}

  public onDeleteClick(postId: string): void {
    // Wait for confirmation
    if (confirm('Are you sure?')) {
      // Remove post from table
      this.posts = this.posts.filter((post: Post) => post._id !== postId);
      // Delete post
      this.postService.deletePost(postId).subscribe(() => {
        this.flashMessageService.show('Post removed...', {
          cssClass: 'alert alert-success',
        });
      });
    }
  }
}
