import { faker } from '@faker-js/faker';

const validData = {
    email: "your_email@example.com",
    password: "your_password",
    profileName: "Your Name"
}

const unregisteredData = {
    email: faker.internet.email(),
    password: faker.internet.password()
    
}

export {validData, unregisteredData}



