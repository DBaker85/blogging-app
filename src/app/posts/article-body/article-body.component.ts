import { Component, Input, ElementRef } from '@angular/core';
import { Logger } from '../../common'

@Component({
    selector: 'article-body',
    templateUrl: './article-body.component.html'
})
export class ArticleBodyComponent {
    stringified;
    constructor(
        private logger:Logger,
        private el: ElementRef
    ){
        logger.log(this)
    }
    @Input() body;

    logOutput(event) {
        
       this.stringified = JSON.stringify(event)
    }
}