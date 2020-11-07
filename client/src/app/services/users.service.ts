import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  public registerUser(user: User): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users/register`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
