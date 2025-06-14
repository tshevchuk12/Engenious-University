import { Page} from "@playwright/test";
import {mainPageSelectors} from "../Selectors/mainPageSelectors.ts"


class MainPage {
    private page: Page;
і
    constructor(page: Page){
        this.page = page;
    }

    async clickBurgerButton(){
        await this.page.waitForSelector(mainPageSelectors.BURGER_BUTTON)
        await this.page.click(mainPageSelectors.BURGER_BUTTON)
    };
    async getProfileName(){
        return this.page.innerText(mainPageSelectors.PROFILE_NAME)
    }
}

export {MainPage}