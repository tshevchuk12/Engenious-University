import { APIRequestContext, APIResponse } from "@playwright/test";

class LoginAPI {
  constructor(private request: APIRequestContext) {}

  async getToken(response: APIResponse): Promise<string> {
    const body = await response.json();
    return body.accessToken;
  }

  async getUserProfilePath(token: string) {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    const userId = payload.sub || payload.id;
    const path = `/users/${userId}`;
    return path;
  }

  async getProfileResponse(request: APIRequestContext, path: string, token: string, baseAPIUrl: string) {
    return await request.get(baseAPIUrl + path, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export { LoginAPI };
