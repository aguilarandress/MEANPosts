import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean;
  private currentUser: User;
  private token: string;
  private jwtHelper: JwtHelperService;

  constructor(private httpClient: HttpClient) {
    this.isLoggedIn = false;
    this.currentUser = {
      _id: '',
      code: '',
      name: '',
      password: '',
    };
    this.token = null;
    this.jwtHelper = new JwtHelperService();
  }

  public authenticateUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/auth`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public setAuthenticationToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
    this.currentUser = this.jwtHelper.decodeToken(token).user;
    this.isLoggedIn = true;
  }

  public loadAuthenticationToken(): void {
    // Check for token
    const token: string = localStorage.getItem('auth_token');
    if (token) {
      // Check if token is expired
      if (!this.jwtHelper.isTokenExpired(token)) {
        this.setAuthenticationToken(token);
      }
    }
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  public logout(): void {
    this.token = '';
    this.isLoggedIn = false;
    this.currentUser = {
      _id: '',
      code: '',
      name: '',
      password: '',
    };
    localStorage.removeItem('auth_token');
  }
}
