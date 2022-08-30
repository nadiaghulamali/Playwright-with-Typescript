
import { expect, Locator, Page } from '@playwright/test';

export class KayakHomePage {

readonly page: Page;
readonly closeBtn:Locator
readonly origin: Locator
readonly destination :Locator
readonly calenderIcon: Locator
readonly startDate: Locator
readonly endDate: Locator
readonly searchBtn:Locator
readonly adviceTitle:Locator
readonly originValue:Locator
readonly destinationValue:Locator
readonly startDateValue: Locator
readonly endDateValue: Locator
readonly adult : Locator
readonly cheapest: Locator
readonly best:Locator
readonly quickest: Locator
readonly largestTime: Locator
readonly bestTime: Locator
readonly quickestTime: Locator
readonly nextMonth: Locator
readonly oneWay: Locator
 

constructor(page: Page) {
this.page = page;
this.closeBtn=page.locator(".vvTc-item-close");
this.origin=page.locator("input[placeholder='From?']");
this.destination =page.locator("input[placeholder='To?']");
this.originValue=page.locator("(//div[@class='vvTc-item-value'])[1]");
this.destinationValue=page.locator("(//div[@class='vvTc-item-value'])[2]");
this.startDate=page.locator("span[aria-label='Start date calendar input']");
this.endDate=page.locator("span[aria-label='End date calendar input']");
this.adviceTitle=page.locator(".advice-title");
this.startDateValue=page.locator("(//span[@class='sR_k-value'])[1]");
this.endDateValue=page.locator("(//span[@class='sR_k-value'])[2]");
this.searchBtn=page.locator("button[aria-label='Search']");
this.adult=page.locator("//div[@class='zcIg']//div[2]");
this.best= page.locator("//a[contains(@aria-label,'Sort by Best')]//span[contains(@class,'js-price')]");
this.cheapest=page.locator("//a[contains(@aria-label,'Sort by Cheapest')]//span[contains(@class,'js-price')]");
this.quickest=page.locator("//a[contains(@aria-label,'Sort by Quickest')]//span[contains(@class,'js-price')]");
this.bestTime= page.locator("//a[contains(@aria-label,'Sort by Best')]//span[contains(@class,'js-duration')]");
this.largestTime=page.locator("//a[contains(@aria-label,'Sort by Cheapest')]//span[contains(@class,'js-duration')]");
this.quickestTime=page.locator("//a[contains(@aria-label,'Sort by Quickest')]//span[contains(@class,'js-duration')]");
this.nextMonth=page.locator("button[aria-label='Next Month']");
this.oneWay=page.locator("One-way");
}

    async closeSelectedOrigin(){
        await this.closeBtn.click();
    }

    async enterOriginInput(origin :string){
        await this.origin.fill(origin);
        await this.page.waitForSelector('ul[role="tablist"]');
        await this.page.keyboard.press('Enter');  
    }

    async enterDestinationInput(destinationData: string){
        await this.destination.fill(destinationData);
        await this.page.waitForSelector('ul[role="tablist"]');
        await this.page.keyboard.press('Enter'); 
    }

    async selectStartDate(date:string){
        await this.startDate.click(); 
        const originDate= `div[aria-label*='${date}']`;
        if(!(await this.page.isVisible(originDate))){
            await this.nextMonth.click();
          } 
        await this.page.locator(originDate).click();
    }
    async selectEndDate(date:string){
        await this.endDate.click(); 
        const destinationDate= `div[aria-label*='${date}']`;
        if(!(await this.page.isVisible(destinationDate))){
            await this.nextMonth.click();
        } 
        await this.page.locator(destinationDate).click(); 
    }
    async clickSearch(){
        await this.searchBtn.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        // await this.page.waitForSelector('div[aria-label="Flight Search Form"]');
    }
     
    async getBestFlightByPrice(){
        await this.page.waitForSelector('.resultsHeaderContent')
        const bestFlight = (await this.best.innerText());
        const quickFlight = (await this.quickest.innerText());
        const cheapFlight = (await this.cheapest.innerText());
        if(cheapFlight <= quickFlight && cheapFlight <= bestFlight){
                return true;
         }
        return false;
    }
    async getBestFlightByTime(){
        
        await this.page.waitForSelector('.resultsHeaderContent')
        const bestTimeFlight = (await this.bestTime.innerText());
        const quickTimeFlight = (await this.quickestTime.innerText());
        const largestTimeFlight = (await this.largestTime.innerText());
        if(quickTimeFlight <= bestTimeFlight && quickTimeFlight <= largestTimeFlight){
               return true;
           }
        return false;
    }
                  
}
