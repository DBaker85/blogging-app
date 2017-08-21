import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {PostListCall} from './post.service'
import {Post} from './post.model'
import { slideInOutAnimation, fadeInOutAnimation } from '../animations'


@Component({
    selector:'posts',
    templateUrl:'./postList.template.html',
    styleUrls:['../../sass/posts.scss'],
    animations: [fadeInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@fadeInOutAnimation]': '' }
 
})
export class PostListComponent implements OnInit {

   constructor(
    private postListCall:PostListCall,
    private router: Router
   ){}

   private articles:Array<Post>;
   public postsLoaded:Boolean = false
  private modelError: boolean =false;
    ngOnInit(){
     this.postListCall
        .call('all',0,11)
        .subscribe(result => {
                    this.articles = result;
                    this.postsLoaded = true;
                },
                Error => {
                    this.postsLoaded = false;
                    // if (Error != null) {
                    //     this.modelMessage = Error;
                    // } else {
                    //     this.modelMessage = 'Account fetch failed without an error message';
                    // }
                }
            );
   }

   openPost(url:string):void{
      this.router.navigate([`./article/`,url]);
   }


     
}

  