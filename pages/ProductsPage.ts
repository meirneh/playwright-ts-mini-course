import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export default class ProductsPage extends BasePage {

    private itemDescriptionElement: Locator;
    private inventoryItemNameElement: Locator;
    private shoppingCartElement: Locator;

    constructor(protected page: Page) {
        super(page);
        this.itemDescriptionElement = this.page.locator('.inventory_item_description')
        this.inventoryItemNameElement = this.page.locator('.inventory_item_name')
        this.shoppingCartElement = this.page.locator('.shopping_cart_link');
    }

   /*  public async validateTitle(title: string) {
        await this.validateElementText(this.pageTitleElement, title)
    } */

    /*  public async chooseProductByTitle(expectedproducTitle:string) {
         for(let product of await this.itemDescriptionElement.all()){
             const productTitle = await product.locator(this.inventoryItemNameElement).innerText();
            if (productTitle === expectedproducTitle ) {
             await product.locator('button').click()
            }
         }
     } */

    public async chooseProductByTitle(expectedproducTitle: string) {
        await this.itemDescriptionElement.filter({ hasText: expectedproducTitle })
            .locator('button').click()
    }

    public async validateNumberOfItems(numberOfItems: string){
        await this.validateElementText(this.shoppingCartElement,numberOfItems)
    }

    public async goToCart() {
        await this.clickElement(this.shoppingCartElement)
    }


}