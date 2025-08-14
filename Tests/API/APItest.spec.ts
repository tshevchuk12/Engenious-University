import { validData } from "../../TestData/authData.ts";
import { tokenFormat } from "../../TestData/regexConstants.ts";
import { baseAPIUrl, loginAPIUrl } from "../../TestData/urls.ts";
import { APIResponse } from "@playwright/test";
import { setAllureTags } from "../../Utility/testUtility.ts";
import { test, expect } from "../../Hooks/testHooks.ts";
import { allure } from "allure-playwright";

test.describe("1. API Cases: Login page", () => {
  test("1.1 Check successful login + token validation | @positiveCases", async ({ request, loginAPI }) => {
    setAllureTags(["positiveCases", "smoke"]);

    let response: APIResponse;
    await allure.step("Login with valid credentials", async () => {
      response = await request.post(loginAPIUrl, {
        data: {
          email: validData.email,
          password: validData.password,
        },
      });
    });

    await allure.step("Validate login response status and headers", async () => {
      expect([200, 201]).toContain(response.status());
      expect(response.headers()["content-type"]).toContain("application/json");
    });

    let token: string;

    await allure.step("Validate token format (JWT)", async () => {
      token = await loginAPI.getToken(response);
      expect(token).toMatch(tokenFormat);
    });

    await allure.step("Access protected endpoint with token", async () => {
      const path = await loginAPI.getUserProfilePath(token);
      const profileResponse = await loginAPI.getProfileResponse(request, path, token, baseAPIUrl);
      expect(profileResponse.status()).toBe(200);
    });
  });
});
