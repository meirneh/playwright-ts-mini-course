import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import ApplicationURL from '../../helpers/ApplicationURL';
import ProductsPage from "../../pages/ProductsPage";


test.describe('Positive Login Scenarios', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page)
    })

    test('Login with standard_user', async () => {

        await loginPage.loginToApplication(process.env.STANDARD_USER, process.env.CORRECT_PASSWORD)
        await loginPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
        await productsPage.validateTitle('Products')
    })

    test('Login with problem_user', async () => {
        await loginPage.loginToApplication(process.env.PROBLEM_USER)
        await loginPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
        await productsPage.validateTitle('Products')
    })

    test('Login with performance_glitch_user', async () => {
        await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER)
        await loginPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
        await productsPage.validateTitle('Products')
    })

    test('Login with error_user', async () => {
        await loginPage.loginToApplication(process.env.ERROR_USER)
        await loginPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
        await productsPage.validateTitle('Products')
    })

    test('Login with visual_user', async () => {
        await loginPage.loginToApplication(process.env.VISUAL_USER)
        await loginPage.validatePageUrl(ApplicationURL.INVENTORY_URL)
        await productsPage.validateTitle('Products')
    })


})