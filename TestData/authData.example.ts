import { faker } from "@faker-js/faker";

export const validData = {
  email: "your_email@example.com",
  password: "your_password",
  profileName: "Your Name",
};

export const unregisteredData = {
  email: faker.internet.email(),
  password: "Qwert12!Q",
};

export const invalidData = {
  email: faker.internet.email().replace(".com", ""),
  empty: "",
};

export const loginErrorMessages = {
  invalidCredentials: "Invalid credentials!",
  emailErrorMessage: "Invalid email address",
  passwordErrorMessage: "Password is required",
};
