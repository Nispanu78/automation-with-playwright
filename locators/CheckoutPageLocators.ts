// A class is created to group all element locators related to the Cart page. Exporting it allows other test files to import and reuse the selectors.
// static: Defines the property at the class level rather than the object level.
// readonly: Prevents reassignment after the initial value is set.

export class CheckoutPageLocators {
  static readonly COMMENT_TEXTAREA = 'textarea.form-control';
  static readonly PLACE_ORDER_BUTTON = 'a[href="/payment"]';
  
  // Payment Fields
  static readonly NAME_ON_CARD_INPUT = 'input[data-qa="name-on-card"]';
  static readonly CARD_NUMBER_INPUT = 'input[data-qa="card-number"]';
  static readonly CVC_INPUT = 'input[data-qa="cvc"]';
  static readonly EXPIRY_MONTH_INPUT = 'input[data-qa="expiry-month"]';
  static readonly EXPIRY_YEAR_INPUT = 'input[data-qa="expiry-year"]';
  static readonly PAY_AND_CONFIRM_BUTTON = 'button[data-qa="pay-button"]';
  
  // Success Messages
  static readonly ORDER_PLACED_MESSAGE = 'p:has-text("Congratulations! Your order has been confirmed!")';
  static readonly REVIEW_ORDER_HEADER = 'h2:has-text("Review Your Order")';
  static readonly DOWNLOAD_INVOICE_BUTTON = 'a.btn-default.check_out';
  static readonly CONTINUE_BUTTON = 'a[data-qa="continue-button"]';
}