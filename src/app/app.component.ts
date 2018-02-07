import { Component, OnInit } from '@angular/core';
import { Logger, webTagLine } from './common';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private logger: Logger,
    public pageTitle: Title
  ) {}

  ngOnInit() {
    this.pageTitle.setTitle(webTagLine);
    this.logger.log('hello world !');
  }

}
