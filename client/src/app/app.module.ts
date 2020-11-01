import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostComponent } from './components/post/post.component';

import { PostService } from './services/post.service';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    PostsComponent,
    PostsListComponent,
    PostComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
