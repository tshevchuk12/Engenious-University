import { test as base, expect } from '@playwright/test';

const test = base; 

test.afterEach(async ({ page }, testInfo) => {
	const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
	await page.screenshot({
		path: `screenshots/${safeTitle}.png`
	});
});


export { test, expect };