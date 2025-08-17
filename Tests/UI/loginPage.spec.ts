import { validData, unregisteredData, invalidData, loginUIErrorMessages } from "../../TestData/authData";
import { submitMethod } from "../../TestData/loginConfig";
import { loginPageSelectors } from "../../Selectors/loginPageSelectors";
import { test, expect } from "../../Hooks/testHooks";
import { attachScreenshot, setAllureTags } from "../../Utility/testUtility";
import { allure } from "allure-playwright";

test.describe("1. Positive Cases", () => {
  const loginMethods = [
    {
      method: submitMethod.click,
      description: "1.1 Check successful login via Submit button | @positiveCases",
    },

    {
      method: submitMethod.enter,
      description: "1.2 Check successful login via Enter key | @positiveCases",
    },
  ];

  loginMethods.forEach(({ method, description }) => {
    test(description, async ({ loginPage, mainPage, page }) => {
      setAllureTags(["positiveCases", "regression", "smoke"]);

      await allure.step("Successful user login", async () => {
        await loginPage.loginWithEmail(validData.email, validData.password, method);
      });

      await allure.step("Open user menu", async () => {
        await mainPage.clickBurgerButton();
      });

      await allure.step("Verify user is logged in", async () => {
        try {
          const userName = await mainPage.getProfileName();
          expect(userName).toEqual(validData.profileName);
        } catch (error) {
          await attachScreenshot(page, "Screenshot on failure");
          throw error;
        }
      });
    });
  });

  test("1.3 Check password visibility switches to text | @positiveCases", async ({ loginPage, page }) => {
    setAllureTags(["positiveCases", "regression"]);

    await allure.step("Open Login page", async () => {
      await loginPage.openLoginPage();
    });

    await allure.step("Fill password", async () => {
      await loginPage.fillPassword(validData.password);
    });

    await allure.step("Switch password visibility", async () => {
      await loginPage.clickPasswordToggleButton();
    });

    await allure.step("Verify password visibility switches to text", async () => {
      try {
        const passwordStatus = await loginPage.getPasswordStatus();
        expect(passwordStatus).toEqual("text");
      } catch (error) {
        await attachScreenshot(page, "Screenshot on failure");
        throw error;
      }
    });
  });

  test("1.4 Check trims email before sending (JSON payload) | @positiveCases", async ({ page, loginPage }) => {
    setAllureTags(["positiveCases"]);
    type LoginPayload = { email: string; password: string };
    let sent: LoginPayload | null = null;

    await page.route("**/auth/login", async (route) => {
      sent = route.request().postDataJSON();
      await route.continue();
    });

    await loginPage.loginWithEmail(`  ${validData.email}  `, validData.password, submitMethod.click);

    expect(sent).toBeTruthy();
    expect(sent!.email).toBe(validData.email);
    expect(sent!.password).toBe(validData.password);

    await page.unroute("**/auth/login");
  });
});

test.describe("2. Negative Cases", () => {
  const unsuccessfulLoginData = [
    {
      description: "2.1 Check login with unregistered credentials",
      email: unregisteredData.email,
      password: unregisteredData.password,
    },
    {
      description: "2.2 Check login with incorrect password",
      email: validData.email,
      password: unregisteredData.password,
    },
  ];

  unsuccessfulLoginData.forEach(({ description, email, password }) => {
    test(`${description} | @negativeCases`, async ({ loginPage, page }) => {
      setAllureTags(["negativeCases", "regression", "smoke"]);

      await allure.step("Login with incorrect credentials", async () => {
        await loginPage.loginWithEmail(email, password, submitMethod.enter);
      });

      await allure.step("Verify error message for invalid login", async () => {
        try {
          const errorMessage = await loginPage.getErrorMessage(loginPageSelectors.INVALID_CREDENTIALS_ERROR_MESSAGE);
          expect(errorMessage).toEqual(loginUIErrorMessages.invalidCredentials);
        } catch (error) {
          await attachScreenshot(page, "Screenshot on failure");
          throw error;
        }
      });
    });
  });

  test("2.3 Check login with empty fields | @negativeCases", async ({ loginPage, page }) => {
    setAllureTags(["negativeCases", "regression", "smoke"]);

    await allure.step("Login with empty email and password fields", async () => {
      await loginPage.loginWithEmail(invalidData.empty, invalidData.empty, submitMethod.enter);
    });

    await allure.step("Verify error messages for invalid login", async () => {
      try {
        const emailErrorMessage = await loginPage.getErrorMessage(loginPageSelectors.INVALID_EMAIL_ERROR_MESSAGE);
        expect(emailErrorMessage).toEqual(loginUIErrorMessages.emailErrorMessage);

        const passwordErrorMessage = await loginPage.getErrorMessage(loginPageSelectors.INVALID_PASSWORD_ERROR_MESSAGE);
        expect(passwordErrorMessage).toEqual(loginUIErrorMessages.passwordErrorMessage);
      } catch (error) {
        await attachScreenshot(page, "Screenshot on failure");
        throw error;
      }
    });
  });

  const invalidLoginData = [
    {
      description: "2.4 Check login with valid email and empty password field",
      email: validData.email,
      password: invalidData.empty,
      errorMessageSelector: loginPageSelectors.INVALID_PASSWORD_ERROR_MESSAGE,
      errorMessageText: loginUIErrorMessages.passwordErrorMessage,
    },
    {
      description: "2.5 Check login with invalid email format",
      email: invalidData.email,
      password: unregisteredData.password,
      errorMessageSelector: loginPageSelectors.INVALID_EMAIL_ERROR_MESSAGE,
      errorMessageText: loginUIErrorMessages.emailErrorMessage,
    },
  ];

  invalidLoginData.forEach(({ description, email, password, errorMessageSelector, errorMessageText }) => {
    test(`${description} | @negativeCases`, async ({ loginPage, page }) => {
      setAllureTags(["negativeCases", "regression"]);

      await allure.step("Login with invalid credentials", async () => {
        await loginPage.loginWithEmail(email, password, submitMethod.enter);
      });

      await allure.step("Verify error message for invalid login", async () => {
        try {
          const errorMessage = await loginPage.getErrorMessage(errorMessageSelector);
          expect(errorMessage).toEqual(errorMessageText);
        } catch (error) {
          await attachScreenshot(page, "Screenshot on failure");
          throw error;
        }
      });
    });
  });
});
