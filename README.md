# Test Assignment – Automated Login Test (Playwright + TypeScript)

##  Setup Instructions

### Create test data

Inside `TestData/`, create `loginData.ts` based on the template below:

```ts
const testData = {
    email: "your_email@example.com",
    password: "your_password",
    profileName: "Your Name"
}
export {testData}
```
  `loginData.ts` is **excluded from version control** via `.gitignore` to avoid exposing credentials.
