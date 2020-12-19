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

  public options = {
    charCounterCount: true,
    emoticonsButtons: ['emoticonsBack', '|'],
    fontFamily: {
      'Arial,Helvetica,sans-serif': 'Arial',
      'Georgia,serif': 'Georgia',
      'Impact,Charcoal,sans-serif': 'Impact',
      'Tahoma,Geneva,sans-serif': 'Tahoma',
      'Times New Roman,Times,serif': 'Times New Roman',
      'Verdana,Geneva,sans-serif': 'Verdana',
    },
    fontSizeSelection: true,
    language: 'es',
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
