import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { CoreModule } from '../../core/core.module';
import { PostService } from '../post.service';
import { Logger } from '../../core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  const mockroute = {
    snapshot: {
      params: {
        urlSlug : 'visitor-stats-with-expressjs-and-mongodb'
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule],
      declarations: [ PostComponent ],
      providers: [
        PostService,
        Logger,
        { provide: ActivatedRoute, useValue: mockroute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
