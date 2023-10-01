import { alert, cookies } from "../../utils";
import {
  fetchUser,
  fetchUserListSuccess,
  onValidateUser,
  signinStatus,
} from "./authSlice";

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

export const handleGetUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await authService.getUser();

    dispatch(fetchUser(res));
  } catch (error) {
    console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
  }
};

export const validateUser =
  ({ email }: UserProfile): AppThunk =>
  async (dispatch) => {
    try {
      await authService.validateUser({ email });

      dispatch(onValidateUser(true));
    } catch (error) {
      console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
      dispatch(onValidateUser(false));
    }
  };

export const handleResetPwd =
  (values: UserProfile): AppThunk =>
  async (dispatch) => {
    try {
      const res = await authService.resetPassword(values);

      dispatch(fetchUser(res));
    } catch (error) {
      console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
    }
  };

export const handleGetAllUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await authService.getAllUsers();

    dispatch(fetchUserListSuccess(res.data));
  } catch (error) {
    console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
  }
};

export const handleFindContact =
  (email: string): AppThunk =>
  async () => {
    try {
      const res = await authService.findContact(email);
      console.log("🚀 ~ file: dashboardThunk.ts:68 ~ res:", res);
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:69 ~ error:", error);
    }
  };

export const handleSendInvitation =
  (id: string): AppThunk =>
  async () => {
    try {
      const res = await authService.sendInvitation(id);

      alert({
        content: `${res.message}`,
        position: "top-center",
        type: "success",
      });
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:80 ~ error:", error);
    }
  };
