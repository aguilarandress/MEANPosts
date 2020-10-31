import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

import Post from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  private posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Get all the latest posts
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
