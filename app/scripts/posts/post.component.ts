import {Component, OnInit} from '@angular/core';

import {PostCall} from './post.service'
import {FullPost} from './post.model'

@Component({
    selector:'posts',
    templateUrl:'./post.template.html'
})
export class PostComponent implements OnInit {

   constructor(
    private articles:Array<FullPost>, 
    private postCall:PostCall
   ){}

   ngOnInit(){
     this.postCall
         .call('all',0,10)
         .then(
           Response => {
             this.articles = Response;
           }
         )
   }
}

  