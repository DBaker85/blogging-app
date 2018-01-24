import { Component, OnInit } from '@angular/core';
import { PostListCall } from '../../posts';

@Component({
    selector: 'blog-admin-edit',
    templateUrl: 'edit-post.component.html',
    styleUrls: ['edit-post.component.scss']

})
export class EditPostComponent implements OnInit {

    constructor(
        private postListCall : PostListCall
    ){}

    postsLoaded;
    posts;

    ngOnInit(){
        this.postListCall
           .call('all',0,11)
           .subscribe(result => {
                       this.posts = result;
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

}