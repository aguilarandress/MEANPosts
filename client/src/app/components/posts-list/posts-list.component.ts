import { Component, Input, OnInit } from '@angular/core';

import Post from '../../models/Post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  @Input() posts: Post[];
  constructor() {}

  ngOnInit(): void {}
}
