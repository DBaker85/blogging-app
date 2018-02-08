import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PostBodyComponent } from './components/post-body/post-body.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpinnerComponent,
    PostBodyComponent
  ],
  exports: [
    SpinnerComponent,
    PostBodyComponent
  ]
})
export class CoreModule { }
