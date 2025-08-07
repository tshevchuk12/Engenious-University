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
  if (testInfo.error) {
    await testInfo.attach('screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png'
    });
    
  }
});

export { test, expect };