import Pusher from "pusher-js";

const pusher = new Pusher("bd7b197e7fcf1ef09586", {
  cluster: "ap1",
});

export const channel = pusher.subscribe("my-channel");
