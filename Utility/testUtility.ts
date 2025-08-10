import { allure } from 'allure-playwright';
import { Page } from '@playwright/test';

export async function attachScreenshot(page: Page, title = 'Screenshot') {
  await allure.step('Attach screenshot on failure', async () => {
    await allure.attachment(title, await page.screenshot(), 'image/png');
  });
}

export function setAllureTags(tags: string[]): void {
  tags.forEach((tag) => allure.label('tag', tag));
}
