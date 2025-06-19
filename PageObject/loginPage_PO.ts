import { Page} from "@playwright/test";
import {loginPageSelectors} from "../Selectors/loginPageSelectors.ts"


class LoginPage {
    private page: Page; 

	constructor(page: Page) {
		this.page = page;
	};

    async openLoginPage() {
           await this.page.goto('https://university.engenious.io/login', {waitUntil:"networkidle"})
    };

    async loginWithEmail(email:string,password:string){
        await this.page.fill(loginPageSelectors.EMAIL_FIELD,email)
        await this.page.fill(loginPageSelectors.PASSWORD_FIELD,password)

        await this.page.waitForSelector(loginPageSelectors.SUBMIT_BUTTON)
        await this.page.click(loginPageSelectors.SUBMIT_BUTTON)
    };

    async getInvalidMessage(){
        await this.page.waitForSelector('[role="alert"] div:last-child', { state: 'visible' });
        return this.page.textContent('[role="alert"] div:last-child')

    }
}

 export {LoginPage}