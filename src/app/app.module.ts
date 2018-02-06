import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PostsModule } from './posts/posts.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { TabDirective } from './common/directives/tab.directive';
import { Logger } from './common';
import { Routing } from './app.routes';
import { provideRoutes} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SidepanelComponent,
    HeaderComponent,
    PageNotFoundComponent,
    TabDirective
  ],
  imports: [
    BrowserModule,
    PostsModule,
    Routing
  ],
  providers: [
    Logger,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
