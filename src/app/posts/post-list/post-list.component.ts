import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {


  // constructor(
  //   private postListCall:PostListCall,
  //   private router: Router
  //  ){}

  //  private articles:Array<Post>;
  //  public postsLoaded:Boolean = false
  // private modelError: boolean =false;
    ngOnInit() {
  //    this.postListCall
  //       .call('all',0,11)
  //       .subscribe(result => {
  //                   this.articles = result;
  //                   this.postsLoaded = true;
  //               },
  //               Error => {
  //                   this.postsLoaded = false;
  //                   // if (Error != null) {
  //                   //     this.modelMessage = Error;
  //                   // } else {
  //                   //     this.modelMessage = 'Account fetch failed without an error message';
  //                   // }
  //               }
  //           );
   }

  //  openPost(url:string):void{
  //     this.router.navigate([`./article/`,url]);
  //  }

}
