import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

import Post from '../../models/Post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public posts: Post[];

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId: string = this.authService.getCurrentUser()._id;
    // Get posts
    this.postService.getUserPosts(userId).subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts);
    });
  }
}
