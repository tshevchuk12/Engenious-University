import { Page } from "@playwright/test";
import { mainPageSelectors } from "../Selectors/mainPageSelectors";

class MainPage {
  private page: Page;
  і;
  constructor(page: Page) {
    this.page = page;
  }

  async clickBurgerButton() {
    await this.page.locator(mainPageSelectors.BURGER_BUTTON).click();
  }
  async getProfileName() {
    return this.page.locator(mainPageSelectors.PROFILE_NAME).innerText();
  }
}

export { MainPage };
