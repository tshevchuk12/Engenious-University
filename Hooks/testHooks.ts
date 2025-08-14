import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../PageObject/loginPage_PO";
import { MainPage } from "../PageObject/mainPage_PO";
import { LoginAPI } from "../APIClient/loginApi";

type Fixtures = {
  loginPage: LoginPage;
  mainPage: MainPage;
  loginAPI: LoginAPI;
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
  loginAPI: async ({ request }, use) => {
    const loginAPI = new LoginAPI(request);
    await use(loginAPI);
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.error) {
    await testInfo.attach("screenshot", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  }
});

export { test, expect };
