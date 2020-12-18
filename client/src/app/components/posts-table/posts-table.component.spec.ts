import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsTableComponent } from './posts-table.component';

describe('PostsTableComponent', () => {
  let component: PostsTableComponent;
  let fixture: ComponentFixture<PostsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
