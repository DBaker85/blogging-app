import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDirective } from './directives/tab/tab.directive';
import { GalleryComponent } from './components/gallery/gallery.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabDirective,
    GalleryComponent,
    EditPostComponent,
    LoginComponent,
    AdminComponent
  ],
  exports: [
    TabDirective,
    GalleryComponent,
    EditPostComponent,
    LoginComponent,
    AdminComponent
  ]
})
export class AdminModule { }
