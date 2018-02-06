import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { FullPost } from '../post';
import { Logger } from '../../common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: FullPost;

  constructor(
    private postService: PostService,
    private logger: Logger,
    private route: ActivatedRoute
    // private sanitizer : DomSanitizer,
    // private el: ElementRef
   ) {}

    ngOnInit() {
      this.postService
          .getSinglePost(this.route.snapshot.params.urlSlug)
          .subscribe(post => {
            this.logger.log(post.body);
            this.post = post;
          });
      // this.postCall
      //     .call(this.route.snapshot.params.urlSlug)
      //     .then(
      //       Response => {
      //         this.article = Response;
      //         this.article.body = Response.body;
      //       }
      //     );
    }
}
