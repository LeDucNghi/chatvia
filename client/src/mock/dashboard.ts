import { Message, RecentMessage, UserProfile } from "../models";

import { faker } from "@faker-js/faker";

export const conversation: Message[] = [
  {
    _id: 1,
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "1",
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
  {
    _id: 2,
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "1",
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
  {
    _id: 3,
    message: faker.lorem.paragraph(2),
    hasImages: true,
    images: [
      {
        id: 1,
        img: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
    sender: {
      _id: "2",
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    _id: 4,
    message: faker.lorem.paragraph(2),
    hasImages: true,
    images: [
      {
        id: 1,
        img: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
    sender: {
      _id: "2",
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    _id: 5,
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "2",
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    _id: 6,
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "1",
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
];

export const recentMessage: RecentMessage[] = [
  {
    _id: "1",
    message: faker.lorem.paragraph(),
    status: "online",
    sender: {
      _id: "1",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "2",
    message: faker.lorem.paragraph(),
    status: "leave",
    sender: {
      _id: "2",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "3",
    message: faker.lorem.paragraph(),
    status: "off",
    sender: {
      _id: "3",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "4",
    message: faker.lorem.paragraph(),
    status: "online",
    sender: {
      _id: "4",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "5",
    message: faker.lorem.paragraph(),
    status: "leave",
    sender: {
      _id: "5",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "6",
    message: faker.lorem.paragraph(),
    status: "online",
    sender: {
      _id: "6",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "7",
    message: faker.lorem.paragraph(),
    status: "off",
    sender: {
      _id: "7",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
];

export const friendRequests: UserProfile[] = [
  {
    _id: "1",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "2",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "3",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "4",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "5",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },

  {
    _id: "6",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
];
