import {Component, Optional} from '@angular/core';

import {Post} from './post.model'

@Component({
    selector:'posts',
    template:`
      <article *ngFor="let article of articles">
        <h2>{{article.title}}</h2>
        <div class="small">
          <i class="icon-clock"></i>
          Mon Jan 04 2016&nbsp;<span>|| posted in&nbsp;<a href="/category/mongodb">{{article.category}}</a></span>
        </div>
        <p>{{article.content}}</p>
        <a href="/post/improving-the-stat-tracker_412016" role="button" type="button" class="btn-reset read-more">
          Read more
          <i class="icon-chevron-thin-right"></i>
        </a>
      </article>
    `
})
export class PostComponent {

   constructor(
    @Optional()
     private articles:Array<Post>
   ){
     this.articles=[
       {
         title:'this',
         category:'mongodb',
         date: new Date(),
         content: `<p>help me</p>`
       },
       {
         title:'this',
         category:'magic',
         date: new Date(),
         content: `<p>make magic</p>`
        }
     ]
   }

}
