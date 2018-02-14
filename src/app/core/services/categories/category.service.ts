import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category } from './category';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {}

  getCategoryList() {
    const options = {};

    return this.http.get<Array<Category>>(`${environment.endpoints}/api/categories`, options);
  }

}

