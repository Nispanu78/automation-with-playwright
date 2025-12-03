// File: pages/BasePage.ts
import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';

// Base class providing common UI actions for all page objects
export class BasePage {
  protected page: Page;

  // Store Playwright's Page instance for use in derived classes. This object provides the browser context used for navigation, locating elements, and interacting with the UI.
  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to a specific URL with logging
  async navigate(url: string) {
    Logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
    Logger.success(`Successfully navigated to: ${url}`);
  }

  // Click an element and log the action
  async clickElement(locator: Locator, elementName: string) {
    Logger.debug(`Clicking on: ${elementName}`);
    await locator.click();
    Logger.success(`Clicked: ${elementName}`);
  }

  // Fill an input field with a specified value
  async fillInput(locator: Locator, value: string, fieldName: string) {
    Logger.debug(`Filling ${fieldName} with: ${value}`);
    await locator.fill(value);
    Logger.success(`Filled ${fieldName}`);
  }

  // Select a value from a dropdown element
  async selectDropdown(locator: Locator, value: string, fieldName: string) {
    Logger.debug(`Selecting ${fieldName}: ${value}`);
    await locator.selectOption(value);
    Logger.success(`Selected ${fieldName}: ${value}`);
  }

  // Wait until an element becomes visible on the page
  async waitForElement(locator: Locator, elementName: string) {
    Logger.debug(`Waiting for: ${elementName}`);
    await locator.waitFor({ state: 'visible' });
    Logger.success(`Element visible: ${elementName}`);
  }

  // Retrieve and return trimmed text content from an element
  async getText(locator: Locator): Promise<string> {
    const text = await locator.textContent();
    return text ? text.trim() : '';
  }

  // Check if an element is currently visible
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }
}