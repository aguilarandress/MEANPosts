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

  constructor(
    private userService: UsersService,
    private flashMessageService: FlashMessagesService,
    private routerService: Router
  ) {
    this.user = {
      _id: '',
      name: '',
      code: '',
      password: '',
    };
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    const { name, password } = this.user;
    // Check complete form
    if (name == '' || password.length < 6) {
      this.flashMessageService.show('Please fill in the form correctly', {
        cssClass: 'alert alert-danger',
      });
      return;
    }
    this.user.code = name;
    this.userService.registerUser(this.user).subscribe(
      () => {
        this.flashMessageService.show('User registered', {
          cssClass: 'alert alert-success',
        });
        this.routerService.navigate(['/login']);
      },
      (err) => {
        this.flashMessageService.show(err.error.error, {
          cssClass: 'alert alert-danger',
        });
      }
    );
  }
}
