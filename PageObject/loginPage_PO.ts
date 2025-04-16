import { Page} from "@playwright/test";
import {loginPageSelectors} from "../Selectors/loginPageSelectors.ts"


const createLoginPage = (page : Page) => {
    const loginPage ={    
        openLoginPage: async() => {
            await page.goto('https://university.engenious.io/login', {waitUntil:"networkidle"})
        },
       
        setEmail: async (email:string) => {
            await page.fill(loginPageSelectors.EMAIL_FIELD,email)
        },
        setPassword: async(password:string)=> {
            await page.fill(loginPageSelectors.PASSWORD_FIELD,password) 
        },
        clickSubmitButton: async() => {
            await page.click(loginPageSelectors.SUBMIT_BUTTON)
        }
        
       
        

    }
    return loginPage
}

export {createLoginPage}