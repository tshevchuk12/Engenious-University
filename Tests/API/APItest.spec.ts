import { validData, unregisteredData, loginAPIErrorMessages } from "../../TestData/authData";
import { tokenFormat } from "../../TestData/regexConstants";
import { baseAPIUrl, loginAPIUrl } from "../../TestData/urls";
import { APIResponse } from "@playwright/test";
import { setAllureTags } from "../../Utility/testUtility";
import { test, expect } from "../../Hooks/testHooks";
import { allure } from "allure-playwright";

test.describe("1. API Cases: Login page", () => {
  // test("1.1 Check successful login + token validation | @positiveCases", async ({ request, loginAPI }) => {
  //   setAllureTags(["positiveCases", "smoke"]);

  //   let response: APIResponse;
  //   await allure.step("Login with valid credentials", async () => {
  //     response = await request.post(loginAPIUrl, {
  //       data: {
  //         email: validData.email,
  //         password: validData.password,
  //       },
  //     });
  //   });

  //   await allure.step("Validate login response status and headers", async () => {
  //     expect([200, 201]).toContain(response.status());
  //     expect(response.headers()["content-type"]).toContain("application/json");
  //   });

  //   let token: string;

  //   await allure.step("Validate token format (JWT)", async () => {
  //     token = await loginAPI.getToken(response);
  //     expect(token).toMatch(tokenFormat);
  //   });

  //   await allure.step("Access protected endpoint with token", async () => {
  //     const path = await loginAPI.getUserProfilePath(token);
  //     const profileResponse = await loginAPI.getProfileResponse(request, path, token, baseAPIUrl);
  //     expect(profileResponse.status()).toBe(200);
  //   });
  // });

  const unsuccessfulLoginData = [
    {
      description: "1.2 Check login with unregistered credentials",
      email: unregisteredData.email,
      password: unregisteredData.password,
    },
    {
      description: "1.3 Check login with incorrect password",
      email: validData.email,
      password: unregisteredData.password,
    },
  ];

  unsuccessfulLoginData.forEach(({ description, email, password }) => {
    test(`${description} | @negativeCases`, async ({ request, loginAPI }) => {
      setAllureTags(["negativeCases", "regression"]);

      let response: APIResponse;
      await allure.step("Login with incorrect credentials", async () => {
        response = await request.post(loginAPIUrl, {
          data: {
            email: email,
            password: password,
          },
        });
      });

      await allure.step("Validate login response status and headers", async () => {
        expect(response.status()).toBe(401);

        const headers = response.headers();
        expect(headers["content-type"]).toContain("application/json");
        expect(headers["authorization"]).toBeUndefined();
        expect(headers["set-cookie"]).toBeUndefined();
      });

      await allure.step("Verify error response body (invalidCredentials)", async () => {
        const body = await loginAPI.getBody(response);
        expect(body).toEqual(loginAPIErrorMessages.invalidCredentials);
      });
    });
  });
});
