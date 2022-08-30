
import { test, expect, chromium, Browser, BrowserContext,Page } from '@playwright/test';
import { KayakHomePage } from '../pages/home.page';
import { travelorsPage } from '../pages/travelors.page';
import { multiCityPage } from '../pages/multiCity';
import { utilityClass } from '../Utility/commonMethods';
import { allCases } from '../kayakData.json';



const arrayOfData = [allCases.TestCase1,allCases.TestCase2,allCases.TestCase3,allCases.TestCase4];
for (const data of arrayOfData) {
  test(`Verify user is able to search best flight to ${data.originInput}`, async ({ page }) => {

      const homepage = new KayakHomePage(page);
      const utilityMethod = new utilityClass(page);
      const travelor= new travelorsPage(page)
      await utilityMethod.goto();
     
        await homepage.closeSelectedOrigin();
        await homepage.enterOriginInput(data.originInput);
        await homepage.enterDestinationInput(data.destinationInput);
        await homepage.selectStartDate(data.departure);
        await homepage.selectEndDate(data.arrival);

        await travelor.clickAdultDropDown(); 
        await travelor.clickForIncreament(data.passengers.adults,"Adults");
        await travelor.clickForIncreament(data.passengers.seniors,"Students");
        await travelor.clickForIncreament(data.passengers.youth,"Youths");
        await travelor.clickForIncreament(data.passengers.child,"Children");
        await travelor.clickForIncreament(data.passengers.seatInfant,"Toddlers in own seat");
        await travelor.clickForIncreament(data.passengers.lapInfant,"Infants on lap");
    
        await homepage.clickSearch();
        await page.waitForTimeout(5000);
        await expect(homepage.originValue).toHaveText(data.originValue);
        await page.waitForTimeout(5000);
        await expect(homepage.destinationValue).toHaveText(data.destinationValue);
        await page.waitForTimeout(5000);
        await expect(homepage.startDateValue).toHaveText(data.departureDate);
        await page.waitForTimeout(5000);
        await expect(homepage.endDateValue).toHaveText(data.arrivalDate);
        let bestPrices=await homepage.getBestFlightByPrice();
        expect(bestPrices).toBe(true);
        let bestTime=await homepage.getBestFlightByTime();
        expect(bestTime).toBe(true);
         });
}

    test('Student validation required', async ({ page }) => {
      const homepage = new KayakHomePage(page);
      const travelor= new travelorsPage(page)
      const utilityMethod = new utilityClass(page);
      await utilityMethod.goto();
      await travelor.clickAdultDropDown(); 
      await travelor.clickForIncreament(4,"Adults");
      await travelor.clickForIncreament(2,"Students");
      var message=await travelor.getErrorMessage();
      expect(message).toBe(allCases.errorMessage.studentErrorMessage)     
    });
   
    test('Searches cannot have more than 7 children', async ({ page }) => {
      const homepage = new KayakHomePage(page);
      const travelor= new travelorsPage(page)
      const utilityMethod = new utilityClass(page);
      await utilityMethod.goto();
      await travelor.clickAdultDropDown(); 
      await travelor.clickForIncreament(1,"Adults");
      await travelor.clickForIncreament(8,"Children");
      var message=await travelor.getErrorMessage();
      expect(message).toBe(allCases.errorMessage.searchesErrorMessage)
        
    });
    test('Searches cannot have more lap infants than adults', async ({ page }) => {
      const homepage = new KayakHomePage(page);
      const travelor= new travelorsPage(page)
      const utilityMethod = new utilityClass(page);
      await utilityMethod.goto();
      await travelor.clickAdultDropDown(); 
      await travelor.clickForIncreament(1,"Adults");
      await travelor.clickForIncreament(3,"Children");
      await travelor.clickForIncreament(2,"Toddlers in own seat");
      await travelor.clickForIncreament(2,"Infants on lap");
      var message=await travelor.getErrorMessage();
      expect(message).toBe(allCases.errorMessage.lapSearchErr)   
    });

    test('Searches cannot have more than 9 adults', async ({ page }) => {
      const utilityMethod = new utilityClass(page);
      const travelor= new travelorsPage(page)
      await utilityMethod.goto();
      await travelor.clickAdultDropDown(); 
      await travelor.clickForIncreament(10,"Adults");
      var message=await travelor.getErrorMessage();   
      expect(message).toBe(allCases.errorMessage.adultsErrorMessage);   
    });

    test('oneWay:Verify that user is able to search for one way best flight', async ({ page }) => {
      const utilityMethod = new utilityClass(page);
      const homepage = new KayakHomePage(page);
      const multi= new multiCityPage(page);
      const travelor= new travelorsPage(page);
      await utilityMethod.goto();
      await multi.clickTripModeDropDown();
      await multi.clickOneWay();
      await homepage.closeSelectedOrigin()
      await homepage.enterOriginInput(allCases.TestCase1.originInput);
      await homepage.enterDestinationInput(allCases.TestCase1.destinationInput);
      await travelor.clickAdultDropDown(); 
      await travelor.clickForIncreament(allCases.TestCase1.passengers.adults,"Adults");
      await homepage.selectStartDate(allCases.TestCase1.departure);
      let passengerCount=await travelor.getTravelorCount();
      await homepage.clickSearch();
      await expect(homepage.originValue).toHaveText(allCases.TestCase1.originValue);
      await expect(homepage.destinationValue).toHaveText(allCases.TestCase1.destinationValue);
      await expect(homepage.startDateValue).toHaveText(allCases.TestCase1.departureDate);
      let bestPrices=await homepage.getBestFlightByPrice();
      expect(bestPrices).toBe(true);
      let bestTime=await homepage.getBestFlightByTime();
      expect(bestTime).toBe(true);
      let travelorsCount=await travelor.getTravelorCount();
      expect(passengerCount).toBe(travelorsCount);  
    });

    test('multiCity:Verify that user is able to search for multiple best flight', async ({ page }) => {
      const utilityMethod = new utilityClass(page);
      const homepage = new KayakHomePage(page);
      const multi= new multiCityPage(page);
      const travelor= new travelorsPage(page);
      await utilityMethod.goto();
      await multi.clickTripModeDropDown();
      await multi.clickMultiCity();
      await multi.clearValues();
      await multi.enterInputValuesForOrigin();
      await multi.enterInputValuesForDestination();
      await multi.enterInputValuesForDate();
      await travelor.clickAdultDropDown(); 
      await travelor.clickForIncreament(allCases.TestCase1.passengers.adults,"Adults");
      await travelor.closeTravelerBox();
      let passengerCount=await travelor.getTravelorCount();
      await homepage.clickSearch();
      const flights=await multi.getFlights();
      expect(flights).toBe(allCases.multiple.flights);
      const dates=await multi.getDates();
      expect(dates).toBe(allCases.multiple.dates);
      let travelorsCount=await travelor.getTravelorCount();
      let bestPrices=await homepage.getBestFlightByPrice();
      expect(bestPrices).toBe(true);
      let bestTime=await homepage.getBestFlightByTime();
      expect(bestTime).toBe(true);    
      expect(passengerCount).toBe(travelorsCount);
    });
