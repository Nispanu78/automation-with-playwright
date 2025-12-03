// A class is created to group all element locators related to the Cart page. Exporting it allows other test files to import and reuse the selectors.
// static: Defines the property at the class level rather than the object level.
// readonly: Prevents reassignment after the initial value is set.

export class HomePageLocators {
  static readonly SIGNUP_LOGIN_LINK = 'a[href="/login"]';
  static readonly HOME_LINK = 'a[href="/"]';
  static readonly PRODUCTS_LINK = 'a[href="/products"]';
  static readonly CART_LINK = 'a[href="/view_cart"]';
}