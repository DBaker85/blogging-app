import {Component, OnInit, SecurityContext} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { slideInOutAnimation, fadeInOutAnimation } from '../animations'

import {PostCall} from './post.service';
import {FullPost} from './post.model';
import {Logger} from '../common'

@Component({
    selector:'posts',
    templateUrl:'./post.template.html',
    styleUrls:['../../sass/post.scss'],
    // make fade in animation available to this component
    animations: [fadeInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@fadeInOutAnimation]': '' }
 
})
export class PostComponent implements OnInit {

   constructor(
    private postCall:PostCall,
    private logger: Logger,
    private route: ActivatedRoute,
    private sanitizer : DomSanitizer
   ){}

   private article:FullPost={
     _id: "string",
    body: '',
    category : "string",
    date : new Date() ,
    postId : "string",
    title: "string",
    urlSlug : "string",
   }
  
    ngOnInit(){
     this.logger.log(this);
     this.logger.log(this.route.snapshot.params);
     this.postCall
         .call(this.route.snapshot.params.urlSlug)
         .then(
           Response => {
            this.article = Response;
             this.article.body = this.sanitizer.bypassSecurityTrustHtml(Response.body);
             
            
           }
         )
   }
     
     
}

