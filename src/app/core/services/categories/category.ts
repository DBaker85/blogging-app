export interface Category {
  category: String;
  subcategories: Array<Subcategory>;
}

export interface Subcategory {
  subcategory: String;
  active: Boolean;
}
