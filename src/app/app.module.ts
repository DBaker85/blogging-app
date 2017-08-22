import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'
import { RouterModule, Routes }   from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';

import {bloggingComponent} from './app.component'

import {HeaderComponent} from './header/header.component'
import {SidePanelComponent} from './sidepanel/sidepanel.component'
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component'

import {PostListComponent, PostComponent, ArticleBodyComponent, PostCall, PostListCall} from './posts'
import {Logger, WindowRef, TabDirective} from './common'

import 'prismjs/prism';
import 'prismjs/components/prism-markup';

import { PrismComponent } from 'angular-prism';

const appRoutes: Routes = [
  {
    path: 'articles',
    component: PostListComponent
  },
  {
    path: 'article',
    children:[
      {
        path:':urlSlug',
        component: PostComponent,
      },
  ]
  },
  { path: 'article',
    redirectTo: '/articles'
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
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [
    bloggingComponent,
    PostComponent,
    PostListComponent,
    HeaderComponent,
    SidePanelComponent,
    PageNotFoundComponent,
    PrismComponent,
    TabDirective,
    ArticleBodyComponent
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
