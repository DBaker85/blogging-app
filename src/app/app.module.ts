import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'
import { RouterModule, Routes }   from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';

import {bloggingComponent} from './app.component'
import { routing } from './app.routes';
import {HeaderComponent} from './header/header.component'
import {SidePanelComponent} from './sidepanel/sidepanel.component'
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component'

import {PostListComponent, PostComponent, ArticleBodyComponent, PostCall, PostListCall} from './posts'
import {Logger, WindowRef, TabDirective} from './common'

import 'prismjs/prism';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-jade';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { PrismComponent } from 'angular-prism';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    routing     
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
