// File: utils/testDataGenerator.ts
import { faker } from '@faker-js/faker';

export interface UserData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class TestDataGenerator {
  static generateUserData(): UserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      title: faker.helpers.arrayElement(['Mr', 'Mrs']),
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: faker.internet.password({ length: 12 }),
      dateOfBirth: {
        day: faker.number.int({ min: 1, max: 28 }).toString(),
        month: faker.date.month(),
        year: faker.number.int({ min: 1970, max: 2000 }).toString()
      },
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number()
    };
  }

  static generatePaymentData(): PaymentData {
    return {
      nameOnCard: faker.person.fullName(),
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2027'
    };
  }
}