import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from '../post.service';
import { FullPost, Post } from '../post';
import { Logger } from '../../common';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public posts: Array<Post>;
  public postsLoaded: Boolean = false;
  public modelError: Boolean = false;
  public modelMessage: string;

  constructor(
    private postService: PostService,
    private logger: Logger,
    private router: Router
   ) {}


    ngOnInit() {
      this.postService
        .getPostList('all', 0, 11)
        .subscribe(
          postlist => {
            this.logger.log(postlist);
            this.posts = postlist;
            this.postsLoaded = true;
          },
          (err: HttpErrorResponse) => {
            this.postsLoaded = false;
            if (err.statusText != null) {
                this.modelMessage = err.statusText;
            } else {
                this.modelMessage = 'Account fetch failed without an error message';
            }
          }
        );
   }

   openPost(url: string): void {
      this.router.navigate([`./article/`, url]);
   }

}
