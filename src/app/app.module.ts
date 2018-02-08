import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PostsModule } from './posts/posts.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { Logger } from './core';
import { Routing } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    SidepanelComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    PostsModule,
    CoreModule,
    Routing,
    AdminModule
  ],
  providers: [
    Logger,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
