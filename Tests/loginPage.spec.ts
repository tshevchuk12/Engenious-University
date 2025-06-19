import {validData, unregisteredData} from "../TestData/loginData.ts";
import { LoginPage} from '../PageObject/loginPage_PO'
import { MainPage} from '../PageObject/mainPage_PO'
import { test, expect } from '../Hooks/testHooks';



test("Check the login process on Engenious University", async ({page})=> {

    const loginPage = new LoginPage(page)
    const mainPage = new MainPage(page)

    await loginPage.openLoginPage()
    await loginPage.loginWithEmail(validData.email,validData.password)

    await mainPage.clickBurgerButton()

    const userName = await mainPage.getProfileName()
    expect(userName).toEqual(validData.profileName)
     
})

test("Check the login process with unregistered data on Engenious University", async ({page})=> {

    const loginPage = new LoginPage(page)
    
    await loginPage.openLoginPage()
    await loginPage.loginWithEmail(unregisteredData.email,unregisteredData.password)

    const errorMessage  = await loginPage.getInvalidMessage()
    expect(errorMessage).toEqual("Invalid credentials!")
    
})