import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from '../../services/post.service';

import Post from '../../models/Post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
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
    private routerService: Router,
    private activatedRoute: ActivatedRoute,
    private flashMessageService: FlashMessagesService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const { id } = params;
      this.postService.getPostById(id).subscribe((post: Post) => {
        this.post = post;
      });
    });
  }

  public onSubmit(): void {
    // Edit post
    this.postService.editPost(this.post).subscribe((post: Post) => {
      this.flashMessageService.show('Post editted successfuly', {
        cssClass: 'alert alert-success',
      });
      this.routerService.navigateByUrl('/posts');
    });
  }
}
