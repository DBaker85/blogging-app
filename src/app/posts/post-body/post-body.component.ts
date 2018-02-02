import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blog-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent {

  @Input() body;
  stringified;
  constructor(
      // private logger:Logger,
      // private el: ElementRef
  ) {
      // logger.log(this)
  }

  logOutput(event) {
     this.stringified = JSON.stringify(event)
  }

}
