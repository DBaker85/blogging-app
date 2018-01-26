import { Component, OnInit } from '@angular/core';
import { Logger } from '../../common/helpers'

import { imageProperties } from './gallery.model';
import { GalleryCall } from './gallery.service';

@Component({
    selector: 'blog-admin-gallery',
    templateUrl: 'gallery.component.html',
    styleUrls: ['gallery.component.scss']    
})
export class BlogGalleryComponent implements OnInit {

    constructor(
        private galleryCall: GalleryCall,
        private logger: Logger
    ){}

    gallery: Array<imageProperties>;


    ngOnInit(){
        this.galleryCall.call().subscribe(
            data => {
                this.gallery = data;
                this.logger.log(data);
            }
        )
    }

}
