import { expect, Locator, Page, test } from "@playwright/test";

export abstract class BasePage {

    constructor(protected page: Page) {


    }

    public async validatePageUrl(url: string) {
        await test.step(`Validating that a correct value of URL is ${url}`, async () => {
            await expect(this.page).toHaveURL(url)
        })
    }

    public async validateElementText(element: Locator, expectedText: string) {
        await test.step(`Validating that a correct element text is ${expectedText}`, async () => {
            await expect(element).toContainText(expectedText);
        })
    }

    public async clickElement(element: Locator){
        await test.step(`Clicking the '${element}' element`, async () => {
            await element.click()  
        })    
    }

    public async validateTitle(title: string) {
        await this.validateElementText(this.page.locator('.title'), title)
    }

    protected async fillText(element: Locator, textToFill:string) {
        await test.step(`Filling '${textToFill}' into the '${element}'`, async () => {
            await element.fill(textToFill)
        })
        
    }



}