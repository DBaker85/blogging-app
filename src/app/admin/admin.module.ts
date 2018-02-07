import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDirective } from './directives/tab/tab.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabDirective
  ],
  exports: [
    TabDirective
  ]
})
export class AdminModule { }
