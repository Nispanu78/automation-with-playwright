// File: pages/CheckoutPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { PaymentData } from '../utils/testDataGenerator';
import { CheckoutPageLocators } from '../locators/CheckoutPageLocators';

// // CheckoutPage extends BasePage to inherit common actions like click, fill, wait, etc.
export class CheckoutPage extends BasePage {
  private readonly commentTextarea: Locator;
  private readonly placeOrderButton: Locator;
  
  // Payment fields
  private readonly nameOnCardInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly cvcInput: Locator;
  private readonly expiryMonthInput: Locator;
  private readonly expiryYearInput: Locator;
  private readonly payAndConfirmButton: Locator;
  
  // Success message
  private readonly orderPlacedMessage: Locator;
  private readonly reviewOrderHeader: Locator;
  private readonly downloadInvoiceButton: Locator;
  private readonly continueButton: Locator;

  // Constructor initializes locators using Playwright page.locator and locators from CheckoutPageLocators
  constructor(page: Page) {
    // Calls BasePage constructor to set up 'page'
    super(page);
    // // Initialize locators
    this.commentTextarea = page.locator(CheckoutPageLocators.COMMENT_TEXTAREA);
    this.placeOrderButton = page.locator(CheckoutPageLocators.PLACE_ORDER_BUTTON);
    
    // Payment
    this.nameOnCardInput = page.locator(CheckoutPageLocators.NAME_ON_CARD_INPUT);
    this.cardNumberInput = page.locator(CheckoutPageLocators.CARD_NUMBER_INPUT);
    this.cvcInput = page.locator(CheckoutPageLocators.CVC_INPUT);
    this.expiryMonthInput = page.locator(CheckoutPageLocators.EXPIRY_MONTH_INPUT);
    this.expiryYearInput = page.locator(CheckoutPageLocators.EXPIRY_YEAR_INPUT);
    this.payAndConfirmButton = page.locator(CheckoutPageLocators.PAY_AND_CONFIRM_BUTTON);
    
    // Success
    this.orderPlacedMessage = page.locator(CheckoutPageLocators.ORDER_PLACED_MESSAGE);
    this.reviewOrderHeader = page.locator(CheckoutPageLocators.REVIEW_ORDER_HEADER);
    this.downloadInvoiceButton = page.locator(CheckoutPageLocators.DOWNLOAD_INVOICE_BUTTON);
    this.continueButton = page.locator(CheckoutPageLocators.CONTINUE_BUTTON);
  }

  // Fill comment in the order comment textarea
  async addComment(comment: string) {
    // strings in custom helper methods defined in the BasePage class (suchg as fillInput etc.) are used in Logger.debug() and Logger.success() to produce readable logs
    Logger.step('Adding order comment');
    await this.fillInput(this.commentTextarea, comment, 'Order comment');
  }

  // Click "Place Order" button
  async placeOrder() {
    Logger.step('Placing order');
    await this.clickElement(this.placeOrderButton, 'Place Order button');
  }

  // Fill all payment details from PaymentData object with random data created through faker (implemented in the TestDataGenerator.ts file)
  async fillPaymentDetails(paymentData: PaymentData) {
    Logger.step('Filling payment details');
    
    await this.fillInput(this.nameOnCardInput, paymentData.nameOnCard, 'Name on Card');
    await this.fillInput(this.cardNumberInput, paymentData.cardNumber, 'Card Number');
    await this.fillInput(this.cvcInput, paymentData.cvc, 'CVC');
    await this.fillInput(this.expiryMonthInput, paymentData.expiryMonth, 'Expiry Month');
    await this.fillInput(this.expiryYearInput, paymentData.expiryYear, 'Expiry Year');
  }

  // Click "Pay and Confirm" button to submit payment
  async confirmPayment() {
    Logger.step('Confirming payment');
    await this.clickElement(this.payAndConfirmButton, 'Pay and Confirm button');
  }

  // Verify if the order placed message is visible after placing the order
  async isOrderPlaced(): Promise<boolean> {
    Logger.step('Verifying order placement');
    // This is a Playwright command that tells the script to pause until the page finishes loading network activity.
    // Ensures that the success message is checked only after the page has finished all network activity.
    await this.page.waitForLoadState('networkidle');
    
    const isVisible = await this.isVisible(this.orderPlacedMessage);
    if (isVisible) {
      Logger.success('Order placed successfully!');
    } else {
      Logger.error('Order placement failed');
    }
    return isVisible;
  }

  // // Check if the "Review Order" header is visible
  async verifyReviewOrderHeader(): Promise<boolean> {
    return await this.isVisible(this.reviewOrderHeader);
  }

   // Click button to download the invoice
  async downloadInvoice() {
    Logger.step('Downloading invoice');
    await this.clickElement(this.downloadInvoiceButton, 'Download Invoice button');
  }

   // Click "Continue" button after checkout
  async clickContinue() {
    await this.clickElement(this.continueButton, 'Continue button');
  }
}