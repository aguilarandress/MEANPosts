import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private routerService: Router
  ) {}

  ngOnInit(): void {}

  public onLogoutClick(): void {
    this.authService.logout();
    this.flashMessagesService.show("You've been logged out", {
      cssClass: 'alert alert-success',
    });
  }
}
