import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

import Post from '../../models/Post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  public post: Post = {
    _id: '',
    title: '',
    body: '',
  };

  constructor(
    private flashMessageService: FlashMessagesService,
    private postService: PostService,

    private routerService: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Add post
    this.postService.addPost(this.post).subscribe(
      (post: Post) => {
        this.flashMessageService.show('Post created successfuly', {
          cssClass: 'alert alert-success',
        });
        this.routerService.navigateByUrl('/posts');
      },
      (err) => {
        const { errors } = err.error;
        errors.forEach((errorMessage: any) => {
          this.flashMessageService.show(errorMessage.msg, {
            cssClass: 'alert alert-danger',
          });
        });
      }
    );
  }
}
