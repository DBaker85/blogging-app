import {Component, OnInit} from '@angular/core';

import {PostCall} from './post.service'
import {Post} from './post.model'

@Component({
    selector:'posts',
    templateUrl:'./post.template.html',
    styleUrls:['../../sass/posts.scss']
})
export class PostComponent implements OnInit {

   constructor(
    private postCall:PostCall
   ){}

   private articles:Array<Post>;
  
    ngOnInit(){
     this.postCall
         .call('all',0,11)
         .then(
           Response => {
             this.articles = Response
           }
         )
   }
     
}

  