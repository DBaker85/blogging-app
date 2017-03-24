import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {bloggingComponent} from './app.component'
import {PostComponent} from './posts/post.component'



@NgModule({
  imports:      [
    BrowserModule
  ],
  declarations: [
    bloggingComponent,
    PostComponent
    ],
    providers:[

    ],
  bootstrap:    [ bloggingComponent ]
})
export class appModule { }
