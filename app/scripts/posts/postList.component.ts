import {Component, OnInit} from '@angular/core';

import {PostListCall} from './post.service'
import {Post} from './post.model'

@Component({
    selector:'posts',
    templateUrl:'./postList.template.html',
    styleUrls:['../../sass/posts.scss']
})
export class PostListComponent implements OnInit {

   constructor(
    private postListCall:PostListCall
   ){}

   private articles:Array<Post>;
  
    ngOnInit(){
     this.postListCall
         .call('all',0,11)
         .then(
           Response => {
             this.articles = Response
           }
         )
   }
     
}

  