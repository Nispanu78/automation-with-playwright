// A class is created to group all element locators related to the Cart page. Exporting it allows other test files to import and reuse the selectors.
// static: Defines the property at the class level rather than the object level.
// readonly: Prevents reassignment after the initial value is set.

export class SignupPageLocators {
  // Signup Form
  static readonly SIGNUP_NAME_INPUT = 'input[data-qa="signup-name"]';
  static readonly SIGNUP_EMAIL_INPUT = 'input[data-qa="signup-email"]';
  static readonly SIGNUP_BUTTON = 'button[data-qa="signup-button"]';
  
  // Account Information
  static readonly TITLE_MR_RADIO = '#id_gender1';
  static readonly TITLE_MRS_RADIO = '#id_gender2';
  static readonly PASSWORD_INPUT = 'input[data-qa="password"]';
  static readonly DAY_SELECT = 'select[data-qa="days"]';
  static readonly MONTH_SELECT = 'select[data-qa="months"]';
  static readonly YEAR_SELECT = 'select[data-qa="years"]';
  static readonly NEWSLETTER_CHECKBOX = '#newsletter';
  static readonly OFFERS_CHECKBOX = '#optin';
  
  // Address Information
  static readonly FIRST_NAME_INPUT = 'input[data-qa="first_name"]';
  static readonly LAST_NAME_INPUT = 'input[data-qa="last_name"]';
  static readonly COMPANY_INPUT = 'input[data-qa="company"]';
  static readonly ADDRESS_INPUT = 'input[data-qa="address"]';
  static readonly ADDRESS2_INPUT = 'input[data-qa="address2"]';
  static readonly COUNTRY_SELECT = 'select[data-qa="country"]';
  static readonly STATE_INPUT = 'input[data-qa="state"]';
  static readonly CITY_INPUT = 'input[data-qa="city"]';
  static readonly ZIPCODE_INPUT = 'input[data-qa="zipcode"]';
  static readonly MOBILE_NUMBER_INPUT = 'input[data-qa="mobile_number"]';
  static readonly CREATE_ACCOUNT_BUTTON = 'button[data-qa="create-account"]';
  
  // Success Messages
  static readonly ACCOUNT_CREATED_MESSAGE = 'h2[data-qa="account-created"]';
  static readonly CONTINUE_BUTTON = 'a[data-qa="continue-button"]';
}