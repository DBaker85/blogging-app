import { Component, Input } from '@angular/core';

@Component({
    selector: 'blog-upload-image',
    templateUrl: 'upload-image.component.html',
    styleUrls: ['upload-image.component.scss']
})
export class BlogUploadImageComponent {
    
    @Input() uploadPath = 'images';

}
