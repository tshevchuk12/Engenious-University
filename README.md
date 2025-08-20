# Engenious University – Automated Login Tests

This project contains **UI and API automated tests** for the **Login page**.

---

## Tech Stack

- **Language**: TypeScript
- **Framework**: Playwright
- **Reporting**: Allure Reporter + Playwright HTML Reporter
- **CI/CD**: GitHub Actions (manual workflow trigger)

---

## Test Data & Security

The file `TestData/authData.ts` **does not contain valid credentials** (for security reasons).

- Locally: to run full tests, you need to add your own valid credentials in `authData.ts`.
- On GitHub Actions: tests that require valid data will be automatically **skipped**.

---

##  Running Tests Locally

Install dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

Run all tests:

```bash
npm test
```

Run in UI mode:

```bash
npm run test-ui
```

Generate and open Allure report locally:

```bash
npm run report:generate
npm run report
```

---

## Running Tests by Tags

You can run a specific group of tests using tags:

Run only positive cases:

```bash
npx playwright test --grep @positiveCases
```

Run only tests that require valid data:

```bash
npx playwright test --grep @requiresData
```

Run all tests except those that require valid data:

```bash
npx playwright test --grep-invert @requiresData
```

---

## Running Tests in CI/CD

The project is integrated with **GitHub Actions**.

- Workflow: **manual trigger** only.
- To run: go to **Actions → CI - Manual → Run workflow**.
- Average runtime: ~3 minutes.
- After completion, an **Allure report** is automatically generated and deployed.

You can view the report by clicking the link under **`deploy-allure`** in the workflow summary.

Artifacts saved after each run:

- **allure-report** (HTML Allure report)
- **playwright-report** (Playwright HTML report)
- **github-pages** (deployment package for Allure report)

---

## Project Structure

```
.
├── .github/workflows/   # CI/CD workflow configuration (ci.yml)
├── APIClient/           # API client helpers
├── Hooks/               # Custom test hooks
├── PageObject/          # Page Object Model classes for UI
├── Selectors/           # Selectors for UI elements
├── TestData/            # Test data (authData.ts, authDataExample.ts, configs, urls)
├── Tests/               # Test suites
│   ├── API/             # API tests (e.g., APItest.spec.ts)
│   └── UI/              # UI tests (e.g., loginPage.spec.ts)
├── Utility/             # Utilities and helpers
├── allure-results/      # Raw Allure results (gitignored)
├── allure-report/       # Generated Allure report (gitignored)
├── playwright-report/   # Playwright HTML report (gitignored)
├── package.json         # Project scripts and dependencies
├── package-lock.json    # Exact dependency versions (Node, libs, etc.)
├── playwright.config.ts # Playwright configuration
└── README.md            # Project documentation
```

---

## Notes

- Node.js and dependency versions are locked in **`package-lock.json`**.
- Some folders like `allure-results/`, `allure-report/`, `playwright-report/`, and `test-results/` are excluded from version control (`.gitignore`).
