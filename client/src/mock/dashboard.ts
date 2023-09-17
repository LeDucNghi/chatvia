import { Conversation } from "../models";
import { faker } from "@faker-js/faker";

export const conversationsList: Conversation[] = [
  {
    id: 1,
    conversation: faker.lorem.paragraph(2),
    user: {
      id: 1,
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
  {
    id: 2,
    conversation: faker.lorem.paragraph(2),
    user: {
      id: 1,
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
  {
    id: 3,
    conversation: faker.lorem.paragraph(2),
    hasImages: true,
    images: [
      {
        id: 1,
        img: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
    user: {
      id: 2,
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    id: 4,
    conversation: faker.lorem.paragraph(2),
    hasImages: true,
    images: [
      {
        id: 1,
        img: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
    user: {
      id: 2,
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    id: 5,
    conversation: faker.lorem.paragraph(2),
    user: {
      id: 2,
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    id: 6,
    conversation: faker.lorem.paragraph(2),
    user: {
      id: 1,
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
];

export const recentMessage = [
  {
    id: 1,
    message: faker.lorem.paragraph(),
    user: {
      id: 1,
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    id: 2,
    message: faker.lorem.paragraph(),
    user: {
      id: 2,
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    id: 3,
    message: faker.lorem.paragraph(),
    user: {
      id: 3,
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    id: 4,
    message: faker.lorem.paragraph(),
    user: {
      id: 4,
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    id: 5,
    message: faker.lorem.paragraph(),
    user: {
      id: 5,
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    id: 6,
    message: faker.lorem.paragraph(),
    user: {
      id: 6,
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    id: 7,
    message: faker.lorem.paragraph(),
    user: {
      id: 7,
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
];
