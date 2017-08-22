import { Component, Input } from '@angular/core';
import { Logger } from '../../common'

@Component({
    selector: 'article-body',
    templateUrl: './article-body.component.html'
})
export class ArticleBodyComponent {
    constructor(
        private logger:Logger
    ){
        logger.log(this)
    }
    @Input() body;

}