import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { imageProperties } from './index';



@Injectable()
export class GalleryCall {
    constructor(
        private http: HttpClient
    ) {}

    

    // call(path:string):Promise<ApiResult> {
    call() {
        return this.http.get<Array<imageProperties>>(`/gallery`)
    }
    
}