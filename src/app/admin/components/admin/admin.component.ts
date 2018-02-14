import { Component, OnInit } from '@angular/core';
import { CategoryService, Category, Logger } from '../../../core';

@Component({
  selector: 'blog-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private logger: Logger
  ) {}

  categories: Array<Category>;

  ngOnInit() {
    this.categoryService
                  .getCategoryList()
                  .subscribe(
                    categories => this.categories = categories
                  );
  }

}
