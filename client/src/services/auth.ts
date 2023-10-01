import { DataResponse, UserProfile } from "./../models";

import { axiosClient } from "./axiosClient";

export const authService = {
  signin(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/signin", params);
  },

  signup(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/signup", params);
  },

  resetPassword(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/resetPassword", params);
  },

  getUser(): Promise<UserProfile> {
    return axiosClient.get("/auth/getUser");
  },

  getAllUsers(): Promise<DataResponse<UserProfile>> {
    return axiosClient.get("/auth/users");
  },

  validateUser({ email }: UserProfile): Promise<UserProfile> {
    return axiosClient.post(`/auth/validateUser/${email}`);
  },

  findContact(email: string): Promise<string> {
    return axiosClient.post(`/auth/findContact`, { email });
  },

  sendInvitation(id: string): Promise<any> {
    return axiosClient.post(`/auth/sendInvitation/${id}`);
  },
};
