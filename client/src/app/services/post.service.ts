import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import Post from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets all the latest posts
   * @returns An array of posts
   */
  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  /**
   * Gets a post by id
   * @param id Post id
   * @returns A post with the id
   */
  public getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${environment.apiUrl}/posts/${id}`);
  }
}