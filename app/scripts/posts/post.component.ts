import {Component, OnInit, SecurityContext} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
  
import {PostCall} from './post.service';
import {FullPost} from './post.model';
import {Logger} from '../common'

@Component({
    selector:'posts',
    templateUrl:'./post.template.html',
    styleUrls:['../../sass/post.scss']
})
export class PostComponent implements OnInit {

   constructor(
    private postCall:PostCall,
    private logger: Logger,
    private route: ActivatedRoute,
    private sanitizer : DomSanitizer
   ){}

   private article:any;
  
    ngOnInit(){
     this.logger.log(this);
     this.postCall
         .call(this.route.snapshot.params.urlSlug)
         .then(
           Response => {
            this.article = Response;
             let htmlContent = this.sanitizer.bypassSecurityTrustHtml(Response.body)
             this.article.body = htmlContent;
            
           }
         )
   }
     
     
}

