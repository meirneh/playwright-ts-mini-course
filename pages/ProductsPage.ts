import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export default class ProductsPage extends BasePage {

    private pageTitleElement: Locator;

    constructor(protected page: Page) {
        super(page);
        this.pageTitleElement = this.page.locator('.title')
    }

    public async validateTitle(title: string) {
        await this.validateElementText(this.pageTitleElement, title)
    }

    
}