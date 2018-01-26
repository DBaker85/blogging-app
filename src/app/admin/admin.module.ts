import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminComponent } from './admin.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { BlogGalleryComponent, GalleryCall } from './gallery';

@NgModule({
    imports:      [
     CommonModule,
     HttpClientModule
    ],
    declarations: [
        AdminComponent,
        EditPostComponent,
        BlogGalleryComponent
      ],
      providers: [
          GalleryCall
      ]
  })
  export class AdminModule { };
