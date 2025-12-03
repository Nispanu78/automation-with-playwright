// File: pages/ProductsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { ProductsPageLocators } from '../locators/ProductsPageLocators';

// Interface representing a product with its details and locators
export interface Product {
  name: string;
  price: number;
  element: Locator;
  addToCartButton: Locator;
}

// ProductsPage extends BasePage to reuse common actions like click, fill, wait
export class ProductsPage extends BasePage {
  private readonly womenCategory: Locator;
  private readonly dressSubcategory: Locator;
  private readonly productsList: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly viewCartLink: Locator;
  private readonly pageTitle: Locator;

  // Constructor initializes locators using Playwright and ProductsPageLocators
  constructor(page: Page) {
    super(page);
    this.womenCategory = page.locator(ProductsPageLocators.WOMEN_CATEGORY);
    this.dressSubcategory = page.locator(ProductsPageLocators.DRESS_SUBCATEGORY);
    this.productsList = page.locator(ProductsPageLocators.PRODUCTS_LIST);
    this.continueShoppingButton = page.locator(ProductsPageLocators.CONTINUE_SHOPPING_BUTTON);
    this.viewCartLink = page.locator(ProductsPageLocators.VIEW_CART_LINK);
    this.pageTitle = page.locator(ProductsPageLocators.PAGE_TITLE);
  }

  // Navigate to Women → Dress category
  async navigateToWomenDressCategory() {
    Logger.step('Navigating to Women → Dress category');
    await this.clickElement(this.womenCategory, 'Women category');
    await this.page.waitForTimeout(500); // Wait for category to expand
    await this.clickElement(this.dressSubcategory, 'Dress subcategory');
    // This is a Playwright command that tells the script to pause until the page finishes loading network activity.
    // Ensures that the success message is checked only after the page has finished all network activity.
    await this.page.waitForLoadState('networkidle');
    Logger.success('Navigated to Dress category');
  }

  // The goal: collect all products on the page and return them as objects with name, price, element, and add-to-cart button.
  async getAllProducts(): Promise<Product[]> {
    Logger.step('Extracting all products from page');
    
    // this.productsList is a locator for all product container elements on the page.
    // .all() fetches an array of Locator objects, each representing a single product container.
    // products is initialized as an empty array — it will store all extracted products.
    const productElements = await this.productsList.all();
    // Product[] means an array of Product objects.
    const products: Product[] = [];
    
    // Loop through each product container individually.
    // Wrap in try/catch to prevent one failing product from stopping the loop.
    for (const element of productElements) {
      try {
        const nameElement = element.locator(ProductsPageLocators.PRODUCT_NAME);
        const priceElement = element.locator(ProductsPageLocators.PRODUCT_PRICE);
        const addToCartBtn = element.locator(ProductsPageLocators.ADD_TO_CART_BUTTON).first();;

        const name = await nameElement.textContent();
        const priceText = await priceElement.textContent();
        
        if (name && priceText) {
          // Extract numeric price (remove "Rs. " and convert to number)
          const price = parseFloat(priceText.replace(/Rs\.\s*/, '').trim());
          
          // Creates a Product object for this item
          products.push({
            name: name.trim(),
            price: price,
            element: element,
            addToCartButton: addToCartBtn
          });
        }
      } catch (error) {
        Logger.error('Error extracting product', error);
      }
    }

    Logger.info(`Total products found: ${products.length}`);
    return products;
  }

   // Log all products with name and price
  displayProducts(products: Product[]) {
    Logger.step('Displaying product names and prices');
    products.forEach((product, index) => {
      Logger.info(`${index + 1}. ${product.name} - Rs. ${product.price}`);
    });
  }

  // Filter products by price range
  filterProductsByPriceRange(products: Product[], minPrice: number, maxPrice: number): Product[] {
    Logger.step(`Filtering products by price range: Rs. ${minPrice} - Rs. ${maxPrice}`);
    
    const filtered = products.filter(product => 
      // Condition: Only include products whose price is greater than or equal to minPrice and less than or equal to maxPrice.
      // This keeps only the products within the specified price range.
      product.price >= minPrice && product.price <= maxPrice
    );
    
    Logger.info(`Filtered products count: ${filtered.length}`);
    return filtered;
  }

  // Sort products by price (ascending or descending)
  sortProductsByPrice(products: Product[], ascending: boolean = true): Product[] {
    Logger.step(`Sorting products by price (${ascending ? 'ascending' : 'descending'})`);
    
    // [...products] creates a shallow copy of the original array so the original is not mutated.
    // .sort((a, b) => …) sorts the copied array based on the price of each product:
    // Ascending: a.price - b.price → smaller prices come first.
    // Descending: b.price - a.price → larger prices come first.
    // a and b are Product objects from the array.
    const sorted = [...products].sort((a, b) => 
      ascending ? a.price - b.price : b.price - a.price
    );
    
    return sorted;
  }

  // Get the second product from the list
  getSecondProduct(products: Product[]): Product | undefined {
    if (products.length >= 2) {
      Logger.info(`Selecting 2nd product: ${products[1].name} - Rs. ${products[1].price}`);
      return products[1];
    }
    Logger.error('Less than 2 products available');
    return undefined;
  }

  // // Add a product to the cart
  async addProductToCart(product: Product) {
    Logger.step(`Adding product to cart: ${product.name}`);
    
    await product.element.scrollIntoViewIfNeeded();
    await product.element.hover();
    await product.addToCartButton.click();
    
    // Wait for modal and click continue shopping
    await this.page.waitForTimeout(1000);
    
    try {
      if (await this.continueShoppingButton.isVisible()) {
        await this.continueShoppingButton.click();
        Logger.success('Product added to cart');
      }
    } catch (error) {
      Logger.debug('Continue shopping button not found or already closed');
    }
  }

  // // Navigate to the cart page
  async goToCart() {
    Logger.step('Going to cart');
    await this.clickElement(this.viewCartLink, 'View Cart link');
  }

  // / Verify page title contains expected text
  async verifyPageTitle(expectedText: string): Promise<boolean> {
    const titleText = await this.getText(this.pageTitle);
    return titleText.includes(expectedText);
  }
}