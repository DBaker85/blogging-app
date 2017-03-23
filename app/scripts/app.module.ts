import {BrowserModule} from '@angular/platform-browser'
import {bloggingComponent} from './app.component'
import {NgModule} from '@angular/core'

@NgModule({
  imports:      [
    BrowserModule
  ],
  declarations: [
    bloggingComponent,
    ],
    providers:[

    ],
  bootstrap:    [ bloggingComponent ]
})
export class appModule { }
