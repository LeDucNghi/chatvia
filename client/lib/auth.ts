import { UserProfile } from "@/models";
import { alert } from "@/utils";
import { authService } from "@/api-client";
import { useRouter } from "next/navigation";

export const signin = async (params: UserProfile) => {
  try {
    const res = await authService.signin(params);
    alert({
      content: res.message!,
      position: "top-center",
      type: "success",
    });

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
