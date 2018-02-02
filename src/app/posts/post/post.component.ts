import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    // private postCall:PostCall,
    // private logger: Logger,
    // private route: ActivatedRoute,
    // private sanitizer : DomSanitizer,
    // private el: ElementRef
   ) {}

  //  public article:FullPost = {
  //   _id: '_id',
  //   body: null,
  //   category : 'category',
  //   date : new Date(),
  //   postId : 'postId',
  //   title: 'title',
  //   headline: 'headline',
  //   urlSlug : 'urlslug'
  //  };

    ngOnInit() {
      // this.logger.log(this);
      // this.logger.log(this.route.snapshot.params);
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
