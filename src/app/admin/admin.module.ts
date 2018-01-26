import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { AdminComponent } from './admin.component';
import { EditPostComponent } from './edit-post/edit-post.component';

import { BlogGalleryComponent, GalleryCall, BlogUploadImageComponent } from './gallery';


@NgModule({
    imports:      [
     CommonModule,
     HttpClientModule,
     DropzoneModule
    ],
    declarations: [
        AdminComponent,
        EditPostComponent,
        BlogGalleryComponent,
        BlogUploadImageComponent
      ],
      providers: [
          GalleryCall
      ]
  })
  export class AdminModule { };
