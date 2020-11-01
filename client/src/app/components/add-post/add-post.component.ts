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
    description: '',
    user: '',
  };

  constructor(
    private flashMessageService: FlashMessagesService,
    private postService: PostService,
    private routerService: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { title, description, user } = this.post;
    // Check for fields
    if (title == '' || description == '' || user == '') {
      this.flashMessageService.show('Please fill in the form correctly...', {
        cssClass: 'alert alert-danger',
      });
      return;
    }
    // Add post
    this.postService.addPost(this.post).subscribe((post: Post) => {
      this.flashMessageService.show('Post added...', {
        cssClass: 'alert alert-success',
      });
      this.routerService.navigateByUrl('/posts');
    });
  }
}
