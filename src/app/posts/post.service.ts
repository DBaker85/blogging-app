import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullPost } from './post';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getPostList(category, start, limit) {
    return this.http.get<FullPost[]>(`${environment.endpoints}/api/posts?category=${category}&start=${start}&limit=${limit}`);
  }

}


// req,res,req.query.category,req.query.start,req.query.limit
