import { io } from "socket.io-client";

const url =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3001";

export const socket = io(url!, { query: { userId: "Jz-dolQFozE1lR4PAAAJ" } });
