import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

import Post from '../../models/Post';
import Comment from '../../models/Comment';

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
    comments: [],
  };

  public comment: Comment = {
    _id: '',
    text: '',
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const { id } = params;
      this.postService.getPostById(id).subscribe((post: Post) => {
        this.post = post;
      });
    });
  }

  public onCommentSubmit(): void {
    const { _id: postId } = this.post;
    // Submit comment
    this.postService.addComment(postId, this.comment.text).subscribe(
      (commentedPost: Post) => {
        this.flashMessagesService.show('Comment submitted', {
          cssClass: 'alert alert-success',
        });
        this.post.comments.push({
          ...this.comment,
          user: this.authService.getCurrentUser(),
        });
        this.comment.text = '';
      },
      (errors) => {
        this.flashMessagesService.show('Please enter a valid comment', {
          cssClass: 'alert alert-danger',
        });
      }
    );
  }
}
