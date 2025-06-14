import { test, expect } from '@playwright/test';
import {testData} from "../TestData/loginData.ts";
import { LoginPage} from '../PageObject/loginPage_PO'
import { MainPage} from '../PageObject/mainPage_PO'



test("Check the login process on Engenious University", async ({page})=> {

    const loginPage = new LoginPage(page)
    const mainPage = new MainPage(page)

    await loginPage.openLoginPage()

    await loginPage.setEmail(testData.email)
    await loginPage.setPassword(testData.password)

    await loginPage.clickSubmitButton()

    await mainPage.clickBurgerButton()

    const userName = await mainPage.getProfileName()
    expect(userName).toEqual(testData.profileName)
    
    await page.screenshot({ path: "screenshots/login-success.png" })

})