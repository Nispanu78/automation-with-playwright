// A class is created to group all element locators related to the Cart page. Exporting it allows other test files to import and reuse the selectors.
// static: Defines the property at the class level rather than the object level.
// readonly: Prevents reassignment after the initial value is set.

export class CartPageLocators {
  static readonly CART_ITEMS = '#cart_info_table tbody tr';
  static readonly PROCEED_TO_CHECKOUT_BUTTON = 'a.btn-default.check_out';
  static readonly CART_PRODUCT_NAMES = '.cart_description h4 a';
  static readonly CART_PRODUCT_PRICES = '.cart_price p';
}