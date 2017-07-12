import { Injectable } from '@angular/core';
import { Http }    from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Post, FullPost} from './post.model';


@Injectable()
export class PostListCall {
    constructor(
        private http: Http
    ) {}
    // call(path:string):Promise<ApiResult> {
    call(filter:string,start:number,limit:number):Promise<Post[]> {
        return this.http.get(`/posts?category=${filter}&start=${start}&limit=${limit}`)
               .toPromise()
               .then(response => response.json() as Post[])
    }
    // $http.get('/posts?category='+filter+'&start='+start+'&limit='+limit ,{cache:false});
}



@Injectable()
export class PostCall {
    constructor(
        private http: Http
    ) {}
    // call(path:string):Promise<ApiResult> {
    call(url:string):Promise<FullPost[]> {
        return this.http.get(`/post/${url}`)
               .toPromise()
               .then(response => response.json() as FullPost[])
    }
    // $http.get('/posts?category='+filter+'&start='+start+'&limit='+limit ,{cache:false});
}
