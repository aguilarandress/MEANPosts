import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

import Post from '../models/Post';
import Comment from '../models/Comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Gets all the latest posts
   * @returns An array of posts
   */
  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  /**
   * Gets the posts created by a user
   * @param userId The id of the user
   */
  public getUserPosts(userId: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      `${environment.apiUrl}/posts/user/${userId}`,
      {
        headers: {
          'x-auth-token': this.authService.getToken(),
        },
      }
    );
  }

  /**
   * Gets a post by id
   * @param id Post id
   * @returns A post with the id
   */
  public getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${environment.apiUrl}/posts/${id}`);
  }

  /**
   * Creates a new post
   * @param post Post to create
   * @returns The new created post
   */
  public addPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${environment.apiUrl}/posts`, post, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.getToken(),
      },
    });
  }

  /**
   * Adds a new comment
   * @param postId The post id
   * @param newComment The new comment
   */
  public addComment(postId: string, comment: string): Observable<Post> {
    return this.httpClient.post<Post>(
      `${environment.apiUrl}/posts/${postId}/comments`,
      { comment },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.getToken(),
        },
      }
    );
  }

  /**
   * Edits a single post
   * @param post New post data
   * @returns Updated post
   */
  public editPost(post: Post): Observable<Post> {
    const { _id } = post;
    return this.httpClient.put<Post>(
      `${environment.apiUrl}/posts/${_id}`,
      post,

      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.getToken(),
        },
      }
    );
  }

  /**
   * Deletes a post
   * @param id Post id
   * @returns Success object
   */
  public deletePost(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/posts/${id}`, {
      headers: {
        'x-auth-token': this.authService.getToken(),
      },
    });
  }
}
