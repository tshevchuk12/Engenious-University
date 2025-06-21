import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../PageObject/loginPage_PO';
import { MainPage } from '../PageObject/mainPage_PO';

type Fixtures = {
  loginPage: LoginPage;
  mainPage: MainPage;
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage); 
  },
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  }
});

test.afterEach(async ({ page }, testInfo) => {
	const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
	await page.screenshot({
		path: `screenshots/${safeTitle}.png`
	});
});


export { test, expect };