import {Component, OnInit} from '@angular/core';

import {PostCall} from './post.service'
import {FullPost} from './post.model'

@Component({
    selector:'posts',
    templateUrl:'./post.template.html',
    // styleUrls:['../../sass/posts.scss']
})
export class PostComponent implements OnInit {

   constructor(
    private postCall:PostCall
   ){}

   private article:Array<FullPost>;
  
    ngOnInit(){
     this.postCall
         .call('sfdgdf')
         .then(
           Response => {
             this.article = Response
           }
         )
   }
     
}

  