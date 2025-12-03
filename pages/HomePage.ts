// File: pages/HomePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { HomePageLocators } from '../locators/HomePageLocators';

export class HomePage extends BasePage {
  private readonly signupLoginLink: Locator;
  private readonly homeLink: Locator;
  private readonly productsLink: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginLink = page.locator(HomePageLocators.SIGNUP_LOGIN_LINK);
    this.homeLink = page.locator(HomePageLocators.HOME_LINK).first();
    this.productsLink = page.locator(HomePageLocators.PRODUCTS_LINK);
    this.cartLink = page.locator(HomePageLocators.CART_LINK);
  }

  async goToSignupLogin() {
    Logger.step('Navigating to Signup/Login page');
    await this.clickElement(this.signupLoginLink, 'Signup/Login link');
  }

  async goToProducts() {
    Logger.step('Navigating to Products page');
    await this.clickElement(this.productsLink, 'Products link');
  }

  async goToCart() {
    Logger.step('Navigating to Cart page');
    await this.clickElement(this.cartLink, 'Cart link');
  }

  async isHomePageLoaded(): Promise<boolean> {
    return await this.isVisible(this.homeLink);
  }
}