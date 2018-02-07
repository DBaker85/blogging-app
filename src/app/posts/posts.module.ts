import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostBodyComponent } from './post-body/post-body.component';
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
    PostListComponent,
    PostBodyComponent
  ],
  exports: [
    PostComponent,
    PostListComponent,
    PostBodyComponent
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }
