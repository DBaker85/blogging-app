import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

import { TabDirective } from './directives/tab/tab.directive';
import { GalleryComponent } from './components/gallery/gallery.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditTagsComponent } from './components/edit-tags/edit-tags.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  declarations: [
    TabDirective,
    GalleryComponent,
    EditPostComponent,
    LoginComponent,
    AdminComponent,
    SidebarComponent,
    EditTagsComponent,
    StatisticsComponent,
    CreatePostComponent
  ],
  exports: [
    TabDirective,
    GalleryComponent,
    EditPostComponent,
    LoginComponent,
    AdminComponent,
    SidebarComponent,
    EditTagsComponent,
    StatisticsComponent,
    CreatePostComponent
  ]
})
export class AdminModule { }
