import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export default class CheckoutYourInformationPage extends BasePage {
    private firstNameField: Locator;
    private lastNameField: Locator;
    private postalCodeField: Locator;
    private continueButton: Locator;
    constructor(protected page: Page) {
        super(page);

        this.firstNameField = this.page.locator('[data-test="firstName"]')
        this.lastNameField = this.page.locator('[data-test="lastName"]')
        this.postalCodeField = this.page.locator('[data-test="postalCode"]')
        this.continueButton = this.page.locator('[data-test="continue"]')
    }

    public async fillInformation(firstName: string, lastName:string, postalCode:string) {
        await this.fillText(this.firstNameField, firstName) 
        await this.fillText(this.lastNameField, lastName)
        await this.fillText(this.postalCodeField,postalCode)  
    }

    public async goToCheckoutOverview() {
      await this.clickElement(this.continueButton)
    }
        
    
}