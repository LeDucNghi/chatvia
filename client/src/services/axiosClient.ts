import { AxiosError } from "axios";
import axios from "axios";

// import type { UserProfile } from "@/models";

export const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `https://chatvia-server.vercel.app/api`
      : `http://localhost:5000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // const user: UserProfile = JSON.parse(localStorage.getItem("user")!);

    // if (user) {
    //   config.headers.Authorization = `Bearer ${user.accessToken}`;
    // }

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
