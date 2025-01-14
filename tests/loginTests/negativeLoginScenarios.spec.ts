import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import UserCredentials from "../../helpers/UserCredentials";
import { ErrorMessages } from "../../helpers/ErrorMessages";
import ApplicationURL from '../../helpers/ApplicationURL';


test.describe('Negative Login Scenarios', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    })

    test('Login with locked out user', async () => {

        await loginPage.loginToApplication(UserCredentials.LOCKED_OUT_USER)
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

    test('Login with incorrect username', async () => {
        await loginPage.loginToApplication('useruser')
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_WRONG_CREDENTIAL)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

    test('Login with incorrect password', async () => {
        await loginPage.loginToApplication(UserCredentials.STANDARD_USER, "blabla")
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_WRONG_CREDENTIAL)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })


})
