import { Page } from "@playwright/test";
import { loginPageSelectors } from "../Selectors/loginPageSelectors.ts";

class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openLoginPage() {
    await this.page.goto("https://university.engenious.io/login", {
      waitUntil: "domcontentloaded",
    });
  }
  async submitByClick() {
    await this.page.locator(loginPageSelectors.SUBMIT_BUTTON).click();
  }
  async submitByEnter() {
    await this.page.keyboard.press("Enter");
  }

  async fillEmail(email: string) {
    await this.page.locator(loginPageSelectors.EMAIL_FIELD).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.locator(loginPageSelectors.PASSWORD_FIELD).fill(password);
  }

  async loginWithEmail(email: string, password: string, submitType: string) {
    await this.openLoginPage();
    await this.fillEmail(email);
    await this.fillPassword(password);

    if (submitType == "click Submit button") {
      await this.submitByClick();
    } else if (submitType == "submit by Enter") {
      await this.submitByEnter();
    }
  }

  async clickPasswordToggleButton() {
    await this.page
      .locator('[aria-label="toggle password visibility"]')
      .click();
  }

  async getPasswordStatus() {
    return this.page
      .locator(loginPageSelectors.PASSWORD_FIELD)
      .getAttribute("type");
  }

  async getErrorMessage() {
    return this.page.locator(loginPageSelectors.ERROR_MESSAGE).textContent();
  }
}

export { LoginPage };
