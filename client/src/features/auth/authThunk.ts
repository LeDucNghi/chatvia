import { alert, cookies } from "../../utils";
import { fetchUser, signinStatus } from "./authSlice";

import { AppThunk } from "../../app/store";
import { UserProfile } from "../../models";
import { authService } from "../../services";

export const signin =
  (values: UserProfile): AppThunk =>
  async (dispatch) => {
    try {
      const res = await authService.signin(values);

      alert({
        content: res.message!,
        position: "top-center",
        type: "success",
      });

      cookies.setCookie("user", res);

      dispatch(signinStatus(true));
    } catch (error: any) {
      console.log("🚀 ~ file: auth.ts:14 ~ signin ~ error:", error);
      alert({
        content: error.response.data.message,
        position: "top-center",
        type: "error",
      });
    }
  };

export const signup =
  (values: UserProfile): AppThunk =>
  async () => {
    try {
      const res = await authService.signup(values);

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

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await authService.getUser();

    dispatch(fetchUser(res));
  } catch (error) {
    console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
  }
};
