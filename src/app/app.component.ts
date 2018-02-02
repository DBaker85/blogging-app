import { Component } from '@angular/core';
import { Logger } from './common';

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private logger: Logger
  ) {
    this.logger.log('hello world !');
  }

  title = 'app';
}
