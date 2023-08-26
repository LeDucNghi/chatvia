import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import { Images } from "@/constants";
import Link from "next/link";

export interface IAppProps {
  children: React.ReactNode;

  page: "isSignIn" | "isSignUp" | "isForgot";

  style?: React.CSSProperties;
}

export function AuthLayout({ children, page, style }: IAppProps) {
  return (
    <div
      className="w-full flex-center container"
      style={{ ...style, height: "100vh" }}
    >
      <div className="w-4/5 flex-center wrapper font-bold">
        <Card className="text-black w-2/4 rounded-md" elevation={10}>
          <CardContent>
            <div className="w-full mb-6">
              <Link className="w-full h-8 flex justify-center mb-10" href="/">
                <Image
                  className="w-4/5 h-full object-contain"
                  src={Images.logo}
                  alt="logo"
                />
              </Link>

              <h4 className="text-center text-xl font-semibold">
                {page === "isSignIn"
                  ? "Sign In"
                  : page === "isSignUp"
                  ? "Sign Up"
                  : "Forgot your password"}{" "}
              </h4>
              <p className="text-gray-400 text-center text-base">
                Sign in to continue to Chatvia
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