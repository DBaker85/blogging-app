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

      this.postService
          .getSinglePost(this.route.snapshot.params.urlSlug)
          .subscribe(post => {
            this.logger.log(post.body);
            this.post = post;
            this.pageTitle.setTitle(`${post.title} | ${webTagLine}`);
            // Normal meta tags
            this.pageMeta.addTags([
              { name: 'Title', content: 'space'},
              { name: 'Keywords', content: 'content.metas.keywords'},
              { name: 'Description', content: 'content.metas.description'},
              { name: 'Author', content: 'content.metas.author' },
              { name: 'Subject', content: 'content.metas.subject' },
              { name: 'Language', content: 'content.metas.language' }
            ]);
            // Facebook meta tags
            this.pageMeta.addTags([
              { property: 'og:site_name', content: 'content.OG.sitename'},
              { property: 'og:url', content: 'content.OG.url' },
              { property: 'og:title', content: 'pagetitle' },
              { property: 'og:description', content: 'content.OG.description' },
              { property: 'og:image', content: 'content.OG.image' },
              { property: 'og:type', content: 'content.OG.type' }
            ]);
          });
    }
}

