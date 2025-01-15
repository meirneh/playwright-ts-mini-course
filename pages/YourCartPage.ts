import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class YourCartPage extends BasePage {

    private cartItem: Locator;
    private cartItemName: Locator;
    private checkoutButton: Locator
    constructor(protected page: Page) {
        super(page);

        this.cartItem = this.page.locator('.cart_item_label');
        this.cartItemName = this.page.locator('.inventory_item_name');
        this.checkoutButton = this.page.locator('#checkout');
    }

    public async validateNumberOfItems(expectedNumber: number) {
        await expect(this.cartItem).toHaveCount(expectedNumber)
    }

    public async validateItemExistsinCart(productName: string) {
        await expect(this.cartItemName.filter({ hasText: productName })).toBeVisible();
    }

    public async goToCheckout() {
        await this.clickElement(this.checkoutButton)
    }
}