import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { FullPost } from '../post';
import { Logger, webTagLine } from '../../common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';


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
    private route: ActivatedRoute,
    public pageTitle: Title,
    public pageMeta: Meta
   ) {}

    ngOnInit() {

      this.logger.log(this.route);

      this.postService
          .getSinglePost(this.route.snapshot.params.urlSlug)
          .subscribe(post => {
            this.logger.log(post.body);
            this.post = post;
            this.pageTitle.setTitle(`${post.title} | ${webTagLine}`);
            // Normal meta tags
            this.pageMeta.addTags([
              { name: 'Title', content: `${post.title}`},
              { name: 'Keywords', content: `${post.category}`},
              { name: 'Description', content: `${post.headline}`},
              { name: 'Author', content: 'David Baker' },
              { name: 'Subject', content: 'Coding' },
              { name: 'Language', content: 'English' }
            ]);
            // Facebook meta tags
            this.pageMeta.addTags([
              { property: 'og:site_name', content: `David Baker's space`},
              { property: 'og:url', content: `https://www.davidbaker.space/article/${this.route.snapshot.params.urlSlug}` },
              { property: 'og:title', content: `${post.title} | ${webTagLine}`},
              { property: 'og:description', content: `${post.headline}`},
              { property: 'og:image', content: 'content.OG.image' },
              { property: 'og:type', content: 'article' }
            ]);
          });
    }
}
