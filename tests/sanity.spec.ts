import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ApplicationURL from '../helpers/ApplicationURL';
import ProductsPage from '../pages/ProductsPage';
import CheckoutYourInformationPage from '../pages/CheckoutYourInformationPage';
import PageTitles from '../helpers/PageTitles';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';
import YourCartPage from '../pages/YourCartPage';

test.describe('Sanity Test Block', () => {

  const products = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie']

  test('Validate doing simple transaction ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page)
    const yourCartPage = new YourCartPage(page)
    const checkoutYourInformationPage = new CheckoutYourInformationPage(page)
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    const checkoutCompletePage = new CheckoutCompletePage(page)
    await loginPage.loginToApplication()
  
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE)
    
    await productsPage.chooseProductByTitle(products[0])
    await productsPage.chooseProductByTitle(products[1])
    await productsPage.chooseProductByTitle(products[2])
  
    await productsPage.validateNumberOfItems(products.length.toString())
    await productsPage.goToCart()
   
    await yourCartPage.validatePageUrl(ApplicationURL.YOURCART_URL)
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE)
    await yourCartPage.validateNumberOfItems(products.length)
    await yourCartPage.validateItemExistsinCart(products[0])
    await yourCartPage.validateItemExistsinCart(products[1])
    await yourCartPage.validateItemExistsinCart(products[2])
    await yourCartPage.goToCheckout()

    await checkoutYourInformationPage.validatePageUrl(ApplicationURL.CHECKOUT_YOUR_INFO_URL)
    await checkoutYourInformationPage.validateTitle(PageTitles.CHECKOUT_YOUR_INFO_PAGE)
    await checkoutYourInformationPage.fillInformation('Haim', 'Cohen', '301000')
    await checkoutYourInformationPage.goToCheckoutOverview()

    await checkoutOverviewPage.validatePageUrl(ApplicationURL.CHECKOUT_OVERVIEW_URL)
    await checkoutOverviewPage.validateTitle(PageTitles.CHECKOUT_OVERVIEW_PAGE)
    await checkoutOverviewPage.validateNumberOfItems(products.length)
    await checkoutOverviewPage.validateItemExistsinCart(products[0])
    await checkoutOverviewPage.validateItemExistsinCart(products[1])
    await checkoutOverviewPage.validateItemExistsinCart(products[2])
    await checkoutOverviewPage.clickFinishButton()

    await checkoutCompletePage.validatePageUrl(ApplicationURL.CHECKOUT_COMPLETE_URL)
    await checkoutCompletePage.validateTitle(PageTitles.CHECKOUT_COMPLETE_PAGE)
    await checkoutCompletePage.validateFinalMessage('Thank you for your order!')
    await checkoutCompletePage.goBackToProducts()
    
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE)
  }); 
})

