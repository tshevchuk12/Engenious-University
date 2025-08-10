import { faker } from '@faker-js/faker';

export const submitMethod = {
  click: 'click',
  enter: 'enter',
};

export const validData = {
  email: '96tania96@gmail.com',
  password: 'Dtcyf12dtcyf!',
  profileName: 'Tetiana Shevchuk',
};

export const unregisteredData = {
  email: faker.internet.email(),
  password: 'Qwert12!Q',
};

export const invalidData = {
  email: faker.internet.email().replace('.com', ''),
  empty: '',
};

export const loginErrorMessages = {
  invalidCredentials: 'Invalid credentials!',
  emailErrorMessage: 'Invalid email address',
  passwordErrorMessage: 'Password is required',
};
