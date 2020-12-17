import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import User from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = {
    _id: '',
    email: '',
    username: '',
    password: '',
  };

  constructor(
    private flashMessageService: FlashMessagesService,
    private routerService: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    // Login request
    this.authService.authenticateUser(this.user).subscribe(
      (response: any) => {
        const { token } = response;
        // Save token to ls
        this.authService.setAuthenticationToken(token);
        this.flashMessageService.show("You're now logged in", {
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
