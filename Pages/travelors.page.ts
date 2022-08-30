import { expect, Locator, Page } from '@playwright/test';
export class travelorsPage {


    readonly page: Page;
    readonly travelorBox:Locator
    readonly adultIncreament:Locator 
    readonly errorMessage: Locator
    readonly travelorCount: Locator
    readonly title :Locator
 
    constructor(page: Page) {
        this.page = page;
        this.travelorBox=page.locator("//div[@class='zcIg']//div[2]");
        this.adultIncreament=page.locator("//div[label[span[contains(text(),'Adults')]]]//button[@aria-label='Decrement'][2]");
        this.errorMessage=page.locator(".cAWq-message");
        this.travelorCount=page.locator("//div[@class='zcIg']//div[2]//span[1]");
        this.title=page.locator(".title-section")
        
    }

    async clickAdultDropDown(){
        await this.travelorBox.click();
    }

    async clickForIncreament(count: number,travelor :string){
        
        if(travelor=="Adults")
        {
            count=count-1;
        }

        const passenger=`//div[label[span[contains(text(),'${travelor}')]]]//button[@aria-label='Decrement'][2]`; 
        for(var i=0;i<count;i++){
           if(await this.page.isDisabled(passenger)){
            this.page.click(passenger, { force: true }); 
        }
        else{
        await this.page.click(passenger);}
        }
        
    }
    async closeTravelerBox(){
        await this.title.click();
    }
    async getErrorMessage(){
        var error = (await this.errorMessage.innerText());
        return error;
    }
    async getTravelorCount(){
        var error = (await this.travelorCount.innerText());
        return error;
    }
    
 }

