import {  Page } from '@playwright/test';
export class utilityClass {


    readonly page: Page;
    readonly url ="https://www.kayak.com/";

    constructor(page: Page) {
        this.page = page;
    }

    async goto(){
        await this.page.goto(this.url, { waitUntil: 'networkidle' });
    }
}