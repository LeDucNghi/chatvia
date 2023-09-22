import { io } from "socket.io-client";

const url =
  process.env.NODE_ENV === "production"
    ? "chatvia-server.vercel.app"
    : "http://localhost:5000";

export const socket = io(url!, { query: { userId: "Jz-dolQFozE1lR4PAAAJ" } , autoConnect : false});
