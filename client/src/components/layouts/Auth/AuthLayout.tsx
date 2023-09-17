"use client";

import "./AuthLayout.scss";

import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Images } from "../../../constants";
import { cookies } from "../../../utils";
import { signinStatus } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";

export interface IAppProps {
  children: React.ReactNode;

  page: "isSignIn" | "isSignUp" | "isForgot";

  style?: React.CSSProperties;
}

export function AuthLayout({ children, page, style }: IAppProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = cookies.getCookie("user");

    if (user) {
      dispatch(signinStatus(true));
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  return (
    <div
      className="w-full flex-center container auth-layout"
      style={{ ...style, height: "100vh" }}
    >
      <div className="w-4/5 flex-center wrapper font-bold">
        <Card className="text-black w-2/4 rounded-md auth-card" elevation={10}>
          <CardContent>
            <div className="w-full mb-6">
              <div className="w-full h-8 flex justify-center mb-4">
                <img
                  className="w-4/5 h-full object-contain"
                  src={Images.logo}
                  alt="logo"
                />
              </div>

              <h4 className="text-center text-xl font-semibold">
                {page === "isSignIn"
                  ? "Sign In"
                  : page === "isSignUp"
                  ? "Sign Up"
                  : "Forgot your password"}{" "}
              </h4>
              <p className="text-gray-400 text-center text-base">
                {page === "isSignIn"
                  ? "Sign in to continue to Chatvia"
                  : page === "isSignUp"
                  ? "Get your Chatvia account now."
                  : "Reset Password with Chatvia"}
              </p>
            </div>

            {children}
          </CardContent>
          {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
        </Card>
      </div>
    </div>
  );
}
