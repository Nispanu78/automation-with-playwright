// File: tests/e2e-user-journey.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { ProductsPage, Product } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { TestDataGenerator, UserData, PaymentData } from '../utils/testDataGenerator';
import { Logger } from '../utils/logger';

test.describe('E2E User Journey Tests', () => {
  let homePage: HomePage;
  let signupPage: SignupPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let userData: UserData;
  let paymentData: PaymentData;

  test.beforeEach(async ({ page }) => {
    Logger.info('='.repeat(80));
    Logger.info('Starting E2E User Journey Test');
    Logger.info('='.repeat(80));

    // Initialize page objects
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Generate test data
    userData = TestDataGenerator.generateUserData();
    paymentData = TestDataGenerator.generatePaymentData();

    Logger.info('Generated test data:', {
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`
    });

    // Navigate to homepage
    await page.goto('/');
    await page.getByRole('button', { name: 'Consent' }).click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('Complete user journey - Registration to Order', async ({ page }) => {
    
    // ========== STEP 1: USER REGISTRATION ==========
    Logger.step('STEP 1: USER REGISTRATION');
    
    await homePage.goToSignupLogin();
    await expect(page).toHaveURL(/.*login/);
    
    await signupPage.fillSignupForm(
      `${userData.firstName} ${userData.lastName}`,
      userData.email
    );
    
    // Fill account information
    await signupPage.fillAccountInformation(userData);
    
    // Fill address information
    await signupPage.fillAddressInformation(userData);
    
    // Verify account creation
    const isAccountCreated = await signupPage.isAccountCreated();
    expect(isAccountCreated).toBeTruthy();
    
    await signupPage.clickContinue();
    Logger.success('User registration completed successfully');

    // ========== STEP 2: CATEGORY NAVIGATION ==========
    Logger.step('STEP 2: CATEGORY NAVIGATION - Women → Dress');
    
    await homePage.goToProducts();
    await expect(page).toHaveURL(/.*products/);
    
    await productsPage.navigateToWomenDressCategory();
    await page.waitForLoadState('networkidle');
    
    // Verify we're on the dress category page
    const isCorrectPage = await productsPage.verifyPageTitle('Women');
    expect(isCorrectPage).toBeTruthy();
    Logger.success('Successfully navigated to Women → Dress category');

    // ========== STEP 3: PRODUCT SELECTION (Using Array Methods) ==========
    Logger.step('STEP 3: PRODUCT SELECTION');
    
    // Extract all products
    const allProducts = await productsPage.getAllProducts();
    expect(allProducts.length).toBeGreaterThan(0);
    
    // Display all product names and prices
    productsPage.displayProducts(allProducts);
    
    // Filter products by price range (Rs. 400 - Rs. 1500)
    const filteredProducts = productsPage.filterProductsByPriceRange(allProducts, 400, 1500);
    Logger.info(`Filtered products (Rs. 400-1500):`);
    productsPage.displayProducts(filteredProducts);
    
    // Sort filtered products by price (ascending)
    const sortedProducts = productsPage.sortProductsByPrice(filteredProducts, true);
    Logger.info('Sorted products by price (ascending):');
    productsPage.displayProducts(sortedProducts);
    
    // Select the 2nd matching product
    const selectedProduct = productsPage.getSecondProduct(sortedProducts);
    expect(selectedProduct).toBeDefined();
    
    if (selectedProduct) {
      // Add selected product to cart
      await productsPage.addProductToCart(selectedProduct);
      Logger.success(`Added to cart: ${selectedProduct.name} - Rs. ${selectedProduct.price}`);
    }

    // ========== STEP 4: CHECKOUT & PAYMENT ==========
    Logger.step('STEP 4: CHECKOUT & PAYMENT');
    
    // Navigate to cart
    await page.goto('/view_cart');
    await expect(page).toHaveURL(/.*view_cart/);
    
    // Review cart contents
    await cartPage.reviewCart();
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBeGreaterThan(0);
    Logger.info(`Cart contains ${cartItemsCount} item(s)`);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await page.waitForLoadState('networkidle');
    
    // Verify checkout page
    const isReviewOrderVisible = await checkoutPage.verifyReviewOrderHeader();
    expect(isReviewOrderVisible).toBeTruthy();
    
    // Add order comment
    await checkoutPage.addComment('Please deliver between 9 AM - 5 PM');
    
    // Place order
    await checkoutPage.placeOrder();
    await expect(page).toHaveURL(/.*payment/);
    
    // Fill payment details with test card
    await checkoutPage.fillPaymentDetails(paymentData);
    Logger.info('Payment details filled with test card: 4111 1111 1111 1111');
    
    // Confirm payment
    await checkoutPage.confirmPayment();
    
    // Verify order placement
    await page.waitForTimeout(2000); // Wait for payment processing
    const isOrderPlaced = await checkoutPage.isOrderPlaced();
    expect(isOrderPlaced).toBeTruthy();
    
    Logger.success('='.repeat(80));
    Logger.success('E2E USER JOURNEY COMPLETED SUCCESSFULLY!');
    Logger.success('='.repeat(80));
  });

  test('Product filtering and sorting validation', async ({ page }) => {
    Logger.step('TEST: Product Filtering and Sorting');
    
    // Navigate to products
    await homePage.goToProducts();
    await productsPage.navigateToWomenDressCategory();
    
    // Get all products
    const allProducts = await productsPage.getAllProducts();
    expect(allProducts.length).toBeGreaterThan(0);
    
    // Test filtering
    const minPrice = 400;
    const maxPrice = 1500;
    const filtered = productsPage.filterProductsByPriceRange(allProducts, minPrice, maxPrice);
    
    // Verify all filtered products are within range
    filtered.forEach(product => {
      expect(product.price).toBeGreaterThanOrEqual(minPrice);
      expect(product.price).toBeLessThanOrEqual(maxPrice);
    });
    
    // Test ascending sort
    const sortedAsc = productsPage.sortProductsByPrice(filtered, true);
    for (let i = 0; i < sortedAsc.length - 1; i++) {
      expect(sortedAsc[i].price).toBeLessThanOrEqual(sortedAsc[i + 1].price);
    }
    
    // Test descending sort
    const sortedDesc = productsPage.sortProductsByPrice(filtered, false);
    for (let i = 0; i < sortedDesc.length - 1; i++) {
      expect(sortedDesc[i].price).toBeGreaterThanOrEqual(sortedDesc[i + 1].price);
    }
    
    Logger.success('Product filtering and sorting validated successfully');
  });
});