const loginPageSelectors = {
  EMAIL_FIELD: '[name="email"]',
  PASSWORD_FIELD: '[name="password"]',
  SUBMIT_BUTTON: '[type="submit"]',
  INVALID_CREDENTIALS_ERROR_MESSAGE: '[role="alert"] div:last-child',
  INVALID_PASSWORD_ERROR_MESSAGE: '[id=":r1:-helper-text"]',
  INVALID_EMAIL_ERROR_MESSAGE: '[id=":r0:-helper-text"]',
  TOGGLE_BUTTON: '[aria-label="toggle password visibility"]',
};
export { loginPageSelectors };
