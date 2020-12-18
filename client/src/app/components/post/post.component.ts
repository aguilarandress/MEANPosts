import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from '../../services/post.service';

import Post from '../../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public post: Post = {
    _id: '',
    title: '',
    body: '',
    date: '',
    user: {
      _id: '',
      username: '',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const { id } = params;
      this.postService.getPostById(id).subscribe((post: Post) => {
        this.post = post;
      });
    });
  }
}
