import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { EditPostComponent } from './edit-post/edit-post.component';
import { BlogGalleryComponent } from './gallery';

@NgModule({
    imports:      [
     CommonModule
    ],
    declarations: [
        AdminComponent,
        EditPostComponent,
        BlogGalleryComponent
      ]
  })
  export class AdminModule { };
