import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export default class CheckoutOverviewPage extends BasePage {

    private cartItemLabel: Locator
    private finishButton: Locator

    constructor(protected page: Page) {
        super(page);

        this.cartItemLabel = this.page.locator('.cart_item_label')
        this.finishButton = this.page.locator('[data-test="finish"]')
    }

    async clickFinishButton() {
        this.clickElement(this.finishButton)
    }

    public async validateNumberOfItems(expectedNumber: number) {
        await expect(this.cartItemLabel).toHaveCount(expectedNumber)
    }

    public async validateItemExistsinCart(productName: string) {
        await expect(this.cartItemLabel.filter({ hasText: productName })).toBeVisible();
    }


}