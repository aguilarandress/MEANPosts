import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import User from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: User;
  public passwordConfirmation: string;

  constructor(
    private userService: UsersService,
    private flashMessageService: FlashMessagesService,
    private routerService: Router
  ) {
    this.user = {
      _id: '',
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    // Check password confirmation
    if (this.passwordConfirmation !== this.user.password) {
      this.flashMessageService.show(
        'Make sure both passwords are the same...',
        { cssClass: 'alert alert-danger' }
      );
      return;
    }
    // Register new user
    this.userService.registerUser(this.user).subscribe(
      () => {
        this.flashMessageService.show("You're now registered", {
          cssClass: 'alert alert-success',
        });
        this.routerService.navigate(['/login']);
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
