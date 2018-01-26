import { Component, OnInit } from  '@angular/core';
import { Logger } from '../common/helpers/logger';

@Component({
    selector:'blog-admin',
    templateUrl:'admin.component.html',
    styleUrls:['admin.component.scss']
})
export class AdminComponent {

    constructor(
        private logger: Logger
    ){}

    
}