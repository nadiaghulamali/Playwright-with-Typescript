import { expect, Locator, Page } from '@playwright/test';
export class multiCityPage {
    

    readonly page: Page;
    readonly tripMode:Locator
    readonly originList:Locator 
    readonly multiCity: Locator
    readonly clearAll: Locator
    readonly oneWay: Locator
    readonly origin: Locator
    readonly multiFlights: Locator
    readonly multiDates: Locator

    
    constructor(page: Page) {
        this.page = page;
        this.tripMode=page.locator("//span[contains(text(),'Round-trip')]");
        this.origin=page.locator("(//input[@class='k_my-input'])[1]")
        this.originList=page.locator("(//input[@class='k_my-input'])");
        this.multiCity=page.locator("//span[contains(text(),'Multi-city')]");
        this.clearAll=page.locator(".zEiP-clearLegs");
        this.oneWay=page.locator("//span[contains(text(),'One-way')]");
        this.multiFlights=page.locator("(//div[@class='olmX-inputDisplayText'])[1]")
        this.multiDates=page.locator("(//div[@class='olmX-inputDisplayText'])[2]")
    }
        async clickTripModeDropDown(){
   
            await this.tripMode.click();
        }
        async clickMultiCity(){
            await this.multiCity.click();
        }
        async clickOneWay(){
            await this.oneWay.click();
        }
        async clearValues(){
            await this.clearAll.click();
        }
        async enterInputValuesForOrigin(){
            const lengthOfList= this.page.$$("(//input[@class='k_my-input'])");
            var inputDestinationData = ["Lahore, Pakistan (LHE)","Islamabad, Pakistan (ISB)","Karachi, Pakistan (KHI)"]; 
            var arrayCounter=0;
            for(var i=1;i<=(await lengthOfList).length;i=i+2){  
                await this.page.locator(`(//input[@class='k_my-input'])[${i}]`).fill(inputDestinationData[arrayCounter]) ;
                await this.page.waitForSelector('ul[role="tablist"]');
                await this.page.keyboard.press('Enter');   
                arrayCounter++;
             }
        }
        async enterInputValuesForDestination(){
            const lengthOfList= this.page.$$("(//input[@class='k_my-input'])");
            var inputDestinationData = ["Islamabad, Pakistan (ISB)","Karachi, Pakistan (KHI)","Lahore, Pakistan (LHE)"]; 
            var arrayCounter=0;
            for(var i=2;i<=(await lengthOfList).length;i=i+2){  
                await this.page.locator(`(//input[@class='k_my-input'])[${i}]`).fill(inputDestinationData[arrayCounter]) ;
                await this.page.waitForSelector('ul[role="tablist"]');
                await this.page.keyboard.press('Enter');
                arrayCounter++;
            }
        }
        async enterInputValuesForDate(){
            const listOfDate=this.page.$$("(//div[contains(@class, 'sR_k-input')])");
            var inputDates = ["September 22","October 22","November 22"]; 
    
            for(var i=1;i<=(await listOfDate).length;i++){  
          
                const originDate= `div[aria-label*='${inputDates[i-1]}']`;
                await this.page.locator(`((//div[contains(@class, 'sR_k-input')]))[${i}]`).click();
                await this.page.locator(originDate).click();
          
            }
        }
 
        async getFlights(){
             const allFlights = (await this.multiFlights.innerText());
            return allFlights;
        }
        async getDates(){
            const allDates = (await this.multiDates.innerText());
            return allDates;
        }
       
 }

