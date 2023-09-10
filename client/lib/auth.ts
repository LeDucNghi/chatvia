import { alert, cookies } from "@/utils";

import { UserProfile } from "@/models";
import { authService } from "@/api-client";

export const signin = async (params: UserProfile) => {
  try {
    const res = await authService.signin(params);
    alert({
      content: res.message!,
      position: "top-center",
      type: "success",
    });

    cookies.setCookie("user", res);

    return res;
  } catch (error: any) {
    console.log("🚀 ~ file: auth.ts:14 ~ signin ~ error:", error);
    alert({
      content: error.response.data.message,
      position: "top-center",
      type: "error",
    });
  }
};

export const signup = async (params: UserProfile) => {
  try {
    const res = await authService.signup(params);
    alert({
      content: res.message!,
      position: "top-center",
      type: "success",
    });
  } catch (error: any) {
    console.log("🚀 ~ file: auth.ts:14 ~ signin ~ error:", error);
    alert({
      content: "Something went wrong",
      position: "top-center",
      type: "error",
    });
  }
};

export const getUser = async (id: number) => {
  try {
  } catch (error) {}
};
