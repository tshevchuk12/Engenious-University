import {validData, unregisteredData} from "../TestData/loginData.ts";
import { LoginPage} from '../PageObject/loginPage_PO'
import { MainPage} from '../PageObject/mainPage_PO'
import { test, expect } from '../Hooks/testHooks';
import { allure } from 'allure-playwright';

test('Login with valid user', async ({ page }) => {
	const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page)

	try{
	await allure.step('Open login page', async () => {
		await loginPage.openLoginPage();
	});

	await allure.step('Login with valid credentials', async () => {
		await loginPage.loginWithEmail(validData.email, validData.password);
	});

    await allure.step('Click Burger button', async()=>{
        await mainPage.clickBurgerButton()
    })

	await allure.step('Verify user is logged in', async () => {
		const userName = await mainPage.getProfileName()
        expect(userName).toEqual(validData.profileName)
	});
} finally{

    await allure.attachment('Screenshot', await page.screenshot(), 'image/png');
}
});


test("Login with unregistered data on Engenious University", async ({page})=> {

    const loginPage = new LoginPage(page)
    
	try{
    await allure.step('Open login page', async () => {
		await loginPage.openLoginPage();
	});

    await allure.step('Login with unregistered credentials', async () => {
		await loginPage.loginWithEmail(unregisteredData.email,unregisteredData.password);
	});

    const errorMessage  = await loginPage.getErrorMessage()
    expect(errorMessage).toEqual("Invalid credentials!")

    await allure.step('Verify error message', async () => {
		 const errorMessage  = await loginPage.getErrorMessage()
    expect(errorMessage).toEqual("Invalid credentials!")
	});
	} finally{
		await allure.attachment('Screenshot', await page.screenshot(), 'image/png');
	}
    
})