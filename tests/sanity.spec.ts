import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ApplicationURL from '../helpers/ApplicationURL';
import ProductsPage from '../pages/ProductsPage';
import YourCartPage from '../pages/YourCartPage';
import PageTitles from '../helpers/pageTitles';

test('sanity test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page)
  const yourCartPage = new YourCartPage(page)
  await loginPage.loginToApplication()

  await productsPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
  await productsPage.validateTitle(PageTitles.INVENTORY_PAGE)
  
  await productsPage.chooseProductByTitle('Sauce Labs Backpack')
  await productsPage.chooseProductByTitle('Sauce Labs Fleece Jacket')
  await productsPage.chooseProductByTitle('Sauce Labs Onesie')

  await productsPage.validateNumberOfItems('3')
  await productsPage.goToCart()

  await yourCartPage.validatePageUrl(ApplicationURL.YOURCART_URL)
  await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE)
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Haim');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Cohen');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('30100');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

test('demo test1', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.loginToApplication()
})

test('demo test2', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.loginToApplication()
  await loginPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
  const productsPage = new ProductsPage(page)
  await productsPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
  await productsPage.validateTitle("Products")
})