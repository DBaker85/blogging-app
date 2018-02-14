import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { Logger } from '../../../core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AdminComponent,
        SidebarComponent,
        CreatePostComponent
      ],
      providers: [
          Logger
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
