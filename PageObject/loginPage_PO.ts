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
        await this.openLoginPage()
        await this.page.fill(loginPageSelectors.EMAIL_FIELD,email)
        await this.page.fill(loginPageSelectors.PASSWORD_FIELD,password)

        await this.page.waitForSelector(loginPageSelectors.SUBMIT_BUTTON)
        await this.page.click(loginPageSelectors.SUBMIT_BUTTON)
    };

    async getErrorMessage(){
        await this.page.waitForSelector(loginPageSelectors.ERROR_MESSAGE, { state: 'visible' });
        return this.page.textContent(loginPageSelectors.ERROR_MESSAGE)

    }
}

 export {LoginPage}