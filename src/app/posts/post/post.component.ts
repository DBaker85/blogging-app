import {Component, OnInit, SecurityContext, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// import { slideInOutAnimation, fadeInOutAnimation } from '../animations'

import {PostCall} from '../post.service';
import {FullPost} from '../post.model';
import {Logger} from '../../common'
import { NgModel } from '@angular/forms'


@Component({
    selector:'posts',
    templateUrl:'./post.component.html',
    styleUrls:['./post.component.scss'],
    // make fade in animation available to this component
    // animations: [fadeInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    // host: { '[@fadeInOutAnimation]': '' }
 
})
export class PostComponent implements OnInit {

   constructor(
    private postCall:PostCall,
    private logger: Logger,
    private route: ActivatedRoute,
    private sanitizer : DomSanitizer,
    private el: ElementRef
   ){}

   public article:FullPost = {
    _id: '_id',
    body: null,
    category : 'category',
    date : new Date(),
    postId : 'postId',
    title: 'title',
    headline: 'headline',
    urlSlug : 'urlslug'
   }

 
    ngOnInit(){
     this.logger.log(this);
     this.logger.log(this.route.snapshot.params);
    
     this.postCall
         .call(this.route.snapshot.params.urlSlug)
         .then(
           Response => {
            this.article = Response;
             this.article.body = Response.body;            
           }
         )
   }
     
     
}

