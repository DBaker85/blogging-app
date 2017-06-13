import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'

import {bloggingComponent} from './app.component'
import {PostComponent} from './posts/post.component'
import {PostCall} from './posts/post.service'


@NgModule({
  imports:      [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    bloggingComponent,
    PostComponent
    ],
    providers:[
      PostCall
    ],
  bootstrap:    [ bloggingComponent ]
})
export class appModule { }
