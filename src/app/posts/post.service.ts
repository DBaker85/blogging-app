import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullPost, Post } from './post';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getPostList(category, start, limit) {

    const options = {
      params: {
          category,
          start,
          limit
      }
    };

    return this.http.get<Post[]>(`${environment.endpoints}/api/posts`, options);
  }

  getSinglePost(url) {
    const options = {
      params: {
          url: url
      }
    };
    return this.http.get<FullPost>(`${environment.endpoints}/api/post`, options);
  }

}


// req,res,req.query.category,req.query.start,req.query.limit
