import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutCompletePage extends BasePage {

    private thankYouMessageElement: Locator;
    private backHomeButton: Locator
    constructor(protected page:Page) {
        super(page);

        this.thankYouMessageElement = this.page.locator('.complete-header')
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]')
    }

    public async validateFinalMessage(expectedMessage: string ) {
        this.validateElementText(this.thankYouMessageElement,expectedMessage)
    }

    public async goBackToProducts() {
        this.clickElement(this.backHomeButton)
    }
}