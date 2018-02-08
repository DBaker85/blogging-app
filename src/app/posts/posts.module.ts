import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule
  ],
  declarations: [
    PostComponent,
    PostListComponent
  ],
  exports: [
    PostComponent,
    PostListComponent
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }
