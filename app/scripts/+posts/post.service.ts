import { Injectable } from '@angular/core';
import { Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

import {Post, ApiFullPost} from './post.model';



@Injectable()
export class PostCall {
    constructor(
        private http: Http
    ) {}

    

    // call(path:string):Promise<ApiResult> {
    call(url:string):Promise<ApiFullPost> {

         let options = {
            params:{
                url:url
            }
        }        

        return this.http.get(`/post`,options)
               .toPromise()
               .then(response => response.json() as ApiFullPost)
    }
    
}



// @Injectable()
// export class PostListCall {
//     constructor(
//         private http: Http
//     ) {}
//     // call(path:string):Promise<ApiResult> {
//     call(filter:string,start:number,limit:number):Promise<Post[]> {
//         return this.http.get(`/posts?category=${filter}&start=${start}&limit=${limit}`)
//                .toPromise()
//                .then(response => response.json() as Post[])
//     }
//     // $http.get('/posts?category='+filter+'&start='+start+'&limit='+limit ,{cache:false});
// }


@Injectable()
export class PostListCall {
   

    constructor(
        private http: Http
    ) {}

    call(filter: string,start:number,limit:number): Observable<Array<Post>> {
        
        let options = {
            params:{
                category:filter,
                start:start,
                limit:limit
            }
        }        

        return this.http.get('/posts',options)
            .map(response => {
                let result = <any>response.json();
                console.log(result)
                return result;
                // if (result.Success) {
                //     return result.Result;
                // } else {
                //     throw new Error(result.ErrorMessage);
                // }
            })
            .catch(()=>{
                return Observable.throw('Http error.')
            });
          
    }
}