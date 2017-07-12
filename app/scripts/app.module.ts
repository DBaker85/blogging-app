import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'
import { RouterModule, Routes }   from '@angular/router';

import {bloggingComponent} from './app.component'
import {PostListComponent, PostComponent} from './posts'
import {HeaderComponent} from './header/header.component'
import {SidePanelComponent} from './sidepanel/sidepanel.component'
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component'

import {PostCall, PostListCall} from './posts/post.service'

import {Logger, WindowRef} from './common'

const appRoutes: Routes = [
  {
    path: 'articles',
    component: PostListComponent
  },
   {
    path: 'article/:urlSlug',
    component: PostComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
]
  

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [
    bloggingComponent,
    PostComponent,
    PostListComponent,
    HeaderComponent,
    SidePanelComponent,
    PageNotFoundComponent
    ],
    providers:[
      PostCall,
      PostListCall,
      Logger,
      WindowRef
    ],
  bootstrap:    [ bloggingComponent ]
})
export class appModule { }
