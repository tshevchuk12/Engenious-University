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
    async setEmail(email:string) {
        await this.page.fill(loginPageSelectors.EMAIL_FIELD,email)
    };
    async setPassword(password:string){
        await this.page.fill(loginPageSelectors.PASSWORD_FIELD,password)
    };
    async clickSubmitButton(){
        await this.page.click(loginPageSelectors.SUBMIT_BUTTON)
    }
}

 export {LoginPage}