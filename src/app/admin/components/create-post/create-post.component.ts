import { Component, OnInit, Input } from '@angular/core';
import { PostPreview } from '../../admin';
import { arrayRemoveByAttr, Logger } from '../../../core';

@Component({
  selector: 'blog-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Input() categories;

  public postPreview: PostPreview = {
    title: '',
    date: new Date(),
    category: '',
    headline: '',
    body: []
  };

  paragraphType: string;
  paragraphLanguage: string;
  arrayRemoveByAttr = arrayRemoveByAttr;

  constructor(
    private logger: Logger
  ) { }

  ngOnInit() {
  }

  createParagraph(type: string, content: string, language = null, legend = null ) {

    this.postPreview.body.push({
      content,
      type,
      language,
      legend
    });

  }

  removeParagraph(i: number) {
    this.postPreview.body.splice(i, 1);
  }

}
