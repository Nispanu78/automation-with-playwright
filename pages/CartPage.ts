// File: pages/CartPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { CartPageLocators } from '../locators/CartPageLocators';

// Page object representing the Cart page, extending shared BasePage functionality
export class CartPage extends BasePage {
  // private: restricts access to the property so it can only be used inside the CartPage class. No external class or test can reference it directly. This enforces encapsulation.
  // readonly: Prevents reassignment after the initial value is set in the constructor. The locator cannot be replaced later in the code, ensuring selector integrity.
  private readonly cartItems: Locator;
  private readonly proceedToCheckoutButton: Locator;
  private readonly cartProductNames: Locator;
  private readonly cartProductPrices: Locator;

  constructor(page: Page) {
    // super(page) invokes the parent class (BasePage) constructor and passes the page object to it.
    super(page);
    this.cartItems = page.locator(CartPageLocators.CART_ITEMS);
    this.proceedToCheckoutButton = page.locator(CartPageLocators.PROCEED_TO_CHECKOUT_BUTTON);
    this.cartProductNames = page.locator(CartPageLocators.CART_PRODUCT_NAMES);
    this.cartProductPrices = page.locator(CartPageLocators.CART_PRODUCT_PRICES);
  }

  async getCartItemsCount(): Promise<number> {
    const items = await this.cartItems.count();
    Logger.info(`Cart items count: ${items}`);
    return items;
  }

// Extracts all product names and all product prices from the page.
// allTextContents() returns an array of text values for every matching element.
// names becomes an array of item names.
// prices becomes an array of item prices.
  async reviewCart() {
    Logger.step('Reviewing cart contents');
    
    const names = await this.cartProductNames.allTextContents();
    const prices = await this.cartProductPrices.allTextContents();
    
    names.forEach((name, index) => {
      Logger.info(`Item ${index + 1}: ${name} - ${prices[index]}`);
    });
  }

  async proceedToCheckout() {
    Logger.step('Proceeding to checkout');
    await this.clickElement(this.proceedToCheckoutButton, 'Proceed to Checkout button');
  }
}