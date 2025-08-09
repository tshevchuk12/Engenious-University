import { validData, unregisteredData } from "../TestData/loginData.ts";
import { test, expect } from "../Hooks/testHooks";
import { attachScreenshot } from "../Utility/testUtility.ts";
import { allure } from "allure-playwright";

test.describe("1. Positive Cases", () => {
  const loginMethods = [
    {
      method: "click Submit button",
      description:
        "1.1 Check successful login via Submit button | @positiveCases",
    },

    {
      method: "submit by Enter",
      description: "1.2 Check successful login via Enter key | @positiveCases",
    },
  ];

  loginMethods.forEach(({ method, description }) => {
    test(description, async ({ loginPage, mainPage, page }) => {
      allure.label("tag", "positiveCases");
      allure.label("tag", "regression");
      allure.label("tag", "smoke");

      try {
        await allure.step(`Login with ${method}`, async () => {
          await loginPage.loginWithEmail(
            validData.email,
            validData.password,
            method,
          );
        });

        await allure.step("Open user menu", async () => {
          await mainPage.clickBurgerButton();
        });

        await allure.step("Verify user is logged in", async () => {
          const userName = await mainPage.getProfileName();
          expect(userName).toEqual(validData.profileName);
        });
      } catch (error) {
        await attachScreenshot(page, "Screenshot on failure");
        throw error;
      }
    });
  });

  test("1.3 Check password visibility switches to text | @positiveCases", async ({
    loginPage,
    page,
  }) => {
    allure.label("tag", "positiveCases");
    allure.label("tag", "regression");

    try {
      await allure.step("Open Login page", async () => {
        await loginPage.openLoginPage();
      });

      await allure.step("Fill password", async () => {
        await loginPage.fillPassword(validData.password);
      });

      await allure.step("Switch password visibility", async () => {
        await loginPage.clickPasswordToggleButton();
      });

      await allure.step(
        "Verify password visibility switches to text",
        async () => {
          const passwordStatus = await loginPage.getPasswordStatus();
          expect(passwordStatus).toEqual("text");
        },
      );
    } catch (error) {
      await attachScreenshot(page, "Screenshot on failure");
      throw error;
    }
  });
});

test.describe("2. Negative Cases", () => {
  test("2.1 Check login with unregistered credentials | @negativeCases", async ({
    loginPage,
    page,
  }) => {
    allure.label("tag", "negativeCases");

    try {
      await allure.step("Login with unregistered credentials", async () => {
        await loginPage.loginWithEmail(
          unregisteredData.email,
          unregisteredData.password,
          "submit by Enter",
        );
      });

      await allure.step("Verify error message for invalid login", async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toEqual("Invalid credentials!");
      });
    } catch (error) {
      await attachScreenshot(page, "Screenshot on failure");
      throw error;
    }
  });
});
