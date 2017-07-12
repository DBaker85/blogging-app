import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'
import { RouterModule, Routes }   from '@angular/router';

import {bloggingComponent} from './app.component'
import {PostComponent} from './posts/post.component'
import {HeaderComponent} from './header/header.component'
import {SidePanelComponent} from './sidepanel/sidepanel.component'
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component'

import {PostCall} from './posts/post.service'

import {Logger, WindowRef} from './common/common'

const appRoutes: Routes = [
  {
    path: 'articles',
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
    HeaderComponent,
    SidePanelComponent,
    PageNotFoundComponent
    ],
    providers:[
      PostCall,
      Logger,
      WindowRef
    ],
  bootstrap:    [ bloggingComponent ]
})
export class appModule { }
