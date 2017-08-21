import { SafeHtml } from '@angular/platform-browser';

export interface Post {
    title: string;
    date: Date;
    category: string;
    content: string;
}

export interface FullPost {
  _id: string;
  body: SafeHtml;
  category : string;
  date : Date ;
  postId : string;
  title: string;
  urlSlug : string;
}

export interface ApiFullPost {
  _id: string;
  body: string;
  category : string;
  date : Date ;
  postId : string;
  title: string;
  urlSlug : string;
}
