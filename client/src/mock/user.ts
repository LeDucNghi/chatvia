import { faker } from "@faker-js/faker";

export const users = [
  {
    id: 1,
    username: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    id: 2,
    username: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    id: 3,
    username: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    id: 4,
    username: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    id: 5,
    username: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    id: 6,
    username: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
];
