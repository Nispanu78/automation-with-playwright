// File: pages/SignupPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { UserData } from '../utils/testDataGenerator';
import { SignupPageLocators } from '../locators/SignupPageLocators';

// SignupPage extends BasePage to reuse common actions like click, fill, wait
export class SignupPage extends BasePage {
  private readonly signupNameInput: Locator;
  private readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;
  
  // Account Information
  private readonly titleMrRadio: Locator;
  private readonly titleMrsRadio: Locator;
  private readonly passwordInput: Locator;
  private readonly daySelect: Locator;
  private readonly monthSelect: Locator;
  private readonly yearSelect: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly offersCheckbox: Locator;
  
  // Address Information
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly addressInput: Locator;
  private readonly address2Input: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;
  
  // Success
  private readonly accountCreatedMessage: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page); // Calls BasePage constructor to set up 'page'
    // Signup form
    this.signupNameInput = page.locator(SignupPageLocators.SIGNUP_NAME_INPUT);
    this.signupEmailInput = page.locator(SignupPageLocators.SIGNUP_EMAIL_INPUT);
    this.signupButton = page.locator(SignupPageLocators.SIGNUP_BUTTON);
    
    // Account info
    this.titleMrRadio = page.locator(SignupPageLocators.TITLE_MR_RADIO);
    this.titleMrsRadio = page.locator(SignupPageLocators.TITLE_MRS_RADIO);
    this.passwordInput = page.locator(SignupPageLocators.PASSWORD_INPUT);
    this.daySelect = page.locator(SignupPageLocators.DAY_SELECT);
    this.monthSelect = page.locator(SignupPageLocators.MONTH_SELECT);
    this.yearSelect = page.locator(SignupPageLocators.YEAR_SELECT);
    this.newsletterCheckbox = page.locator(SignupPageLocators.NEWSLETTER_CHECKBOX);
    this.offersCheckbox = page.locator(SignupPageLocators.OFFERS_CHECKBOX);
    
    // Address info
    this.firstNameInput = page.locator(SignupPageLocators.FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(SignupPageLocators.LAST_NAME_INPUT);
    this.companyInput = page.locator(SignupPageLocators.COMPANY_INPUT);
    this.addressInput = page.locator(SignupPageLocators.ADDRESS_INPUT);
    this.address2Input = page.locator(SignupPageLocators.ADDRESS2_INPUT);
    this.countrySelect = page.locator(SignupPageLocators.COUNTRY_SELECT);
    this.stateInput = page.locator(SignupPageLocators.STATE_INPUT);
    this.cityInput = page.locator(SignupPageLocators.CITY_INPUT);
    this.zipcodeInput = page.locator(SignupPageLocators.ZIPCODE_INPUT);
    this.mobileNumberInput = page.locator(SignupPageLocators.MOBILE_NUMBER_INPUT);
    this.createAccountButton = page.locator(SignupPageLocators.CREATE_ACCOUNT_BUTTON);
    
    // Success
    this.accountCreatedMessage = page.locator(SignupPageLocators.ACCOUNT_CREATED_MESSAGE);
    this.continueButton = page.locator(SignupPageLocators.CONTINUE_BUTTON);
  }

  // ills the initial signup form with name and email.
  async fillSignupForm(name: string, email: string) {
    Logger.step('Filling signup form');
    await this.fillInput(this.signupNameInput, name, 'Name');
    await this.fillInput(this.signupEmailInput, email, 'Email');
    await this.clickElement(this.signupButton, 'Signup button');
  }

  // Fills account info: title, password, date of birth, newsletter/offer checkboxes.
  async fillAccountInformation(userData: UserData) {
    Logger.step('Filling account information');
    
    // Select title
    if (userData.title === 'Mr') {
      await this.clickElement(this.titleMrRadio, 'Mr title');
    } else {
      await this.clickElement(this.titleMrsRadio, 'Mrs title');
    }
    
    await this.fillInput(this.passwordInput, userData.password, 'Password');
    await this.selectDropdown(this.daySelect, userData.dateOfBirth.day, 'Day');
    await this.selectDropdown(this.monthSelect, userData.dateOfBirth.month, 'Month');
    await this.selectDropdown(this.yearSelect, userData.dateOfBirth.year, 'Year');
    
    await this.clickElement(this.newsletterCheckbox, 'Newsletter checkbox');
    await this.clickElement(this.offersCheckbox, 'Offers checkbox');
  }

  // Fills address details and submits the complete form.
  async fillAddressInformation(userData: UserData) {
    Logger.step('Filling address information');
    
    await this.fillInput(this.firstNameInput, userData.firstName, 'First Name');
    await this.fillInput(this.lastNameInput, userData.lastName, 'Last Name');
    await this.fillInput(this.companyInput, userData.company, 'Company');
    await this.fillInput(this.addressInput, userData.address, 'Address');
    await this.fillInput(this.address2Input, userData.address2, 'Address 2');
    await this.selectDropdown(this.countrySelect, userData.country, 'Country');
    await this.fillInput(this.stateInput, userData.state, 'State');
    await this.fillInput(this.cityInput, userData.city, 'City');
    await this.fillInput(this.zipcodeInput, userData.zipcode, 'Zipcode');
    await this.fillInput(this.mobileNumberInput, userData.mobileNumber, 'Mobile Number');
    
    await this.clickElement(this.createAccountButton, 'Create Account button');
  }

  // Checks if the success message is visible after account creation.
  async isAccountCreated(): Promise<boolean> {
    Logger.step('Verifying account creation');
    const isVisible = await this.isVisible(this.accountCreatedMessage);
    if (isVisible) {
      Logger.success('Account created successfully');
    }
    return isVisible;
  }

  async clickContinue() {
    await this.clickElement(this.continueButton, 'Continue button');
  }
}