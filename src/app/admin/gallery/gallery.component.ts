import { Component } from '@angular/core';

import { imageProperties } from './gallery.model';

@Component({
    selector: 'blog-admin-gallery',
    templateUrl: 'gallery.component.html',
    styleUrls: ['gallery.component.scss']    
})
export class BlogGalleryComponent {

    gallery: Array<imageProperties> = [
        {
            title: 'Herrror',
            url: './folder/test.aloha.jpg',
            size: 300
        }
    ]

}
