// A class is created to group all element locators related to the Cart page. Exporting it allows other test files to import and reuse the selectors.
// static: Defines the property at the class level rather than the object level.
// readonly: Prevents reassignment after the initial value is set.

export class ProductsPageLocators {
  static readonly WOMEN_CATEGORY = 'a[href="#Women"]';
  static readonly DRESS_SUBCATEGORY = 'a[href="/category_products/1"]';
  static readonly PRODUCTS_LIST = '.features_items .col-sm-4';
  static readonly PRODUCT_NAME = '.productinfo p';
  static readonly PRODUCT_PRICE = '.productinfo h2';
  static readonly ADD_TO_CART_BUTTON = 'a.btn.btn-default.add-to-cart';
  static readonly CONTINUE_SHOPPING_BUTTON = 'button.btn-success';
  static readonly VIEW_CART_LINK = 'u:has-text("View Cart")';
  static readonly PAGE_TITLE = 'h2.title.text-center';
}