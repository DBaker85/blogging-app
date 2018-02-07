import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '../../common';
import { Paragraph } from '../post';

@Component({
  selector: 'blog-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent {

  @Input() bodyContent: Array<Paragraph>;

  constructor(
      private logger: Logger
  ) {}

}
