import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import UserCredentials from '../helpers/UserCredentials';
import ApplicationURL from '../helpers/ApplicationURL';
// import { url } from 'inspector/promises';

let username: string = UserCredentials.STANDARD_USER
let password: string = UserCredentials.CORRECT_PASSWORD

test('sanity test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.loginToApplication()

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
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
  await loginPage.validatePageUrl(`${ApplicationURL.BASE_URL}inventory.html`)
  
})