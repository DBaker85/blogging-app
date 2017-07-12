import {Component, OnInit} from '@angular/core';
import {Logger} from '../common/common'
import { ActivatedRoute} from '@angular/router';


@Component({
    selector:'pagenotfound',
    templateUrl:'./pagenotfound.template.html'
})
export class PageNotFoundComponent implements OnInit{

    private path:string = this.route.snapshot.url[0].path;

    constructor(
       private logger:Logger,
       private route: ActivatedRoute
    ){}

   

    ngOnInit(){
        this.logger.log(this)
    }

}