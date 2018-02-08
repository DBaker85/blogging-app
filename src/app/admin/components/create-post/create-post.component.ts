import { Component, OnInit } from '@angular/core';
import { PostPreview } from '../../admin';


@Component({
  selector: 'blog-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  public postPreview: PostPreview = {
    title: '',
    date: new Date(),
    category: '',
    headline: '',
    body: []
  };

  constructor() { }

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

}
