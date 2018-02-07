import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { PostListComponent } from './post-list.component';
import { PostService } from '../post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Logger } from '../../core';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../core/core.module';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      providers: [
        PostService,
        HttpClient,
        Logger
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
