"use client";

import React, { useEffect } from "react";

import { AuthLayout } from "@/components/layouts/AuthLayout/AuthLayout";
import Button from "@mui/material/Button";
import { Checkboxes } from "@/components/common/Checkbox/Checkbox";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { socket } from "@/constants";

// import { io } from "socket.io-client";

type Props = {};

export default function SignIn({}: Props) {
  // const joinRoom = () => {
  //   socket.emit("join_room");
  // };

  useEffect(() => {
    console.log("node env", process.env.NODE_ENV);
  }, []);

  const handleChange = (value: string) => {};

  return (
    <AuthLayout page="isSignIn">
      <div className="p-4">
        <div className="flex flex-col">
          <TextField
            fullWidth
            error
            id="outlined-error"
            label="Error"
            defaultValue="Hello World"
            // helperText="Incorrect entry."
            className="mb-4"
          />
          <TextField
            fullWidth
            error
            id="outlined-error"
            label="Error"
            defaultValue="Hello World"
            // helperText="Incorrect entry."
            className="mb-4"
          />

          <div className="container my-6 flex items-center justify-between">
            <Checkboxes
              name="Remember me"
              value="Remember me"
              handleChange={handleChange}
              type="checkbox"
              className="text-sm flex items-center"
            />

            <Link href="/forgot" className="text-sm text-gray-400">
              Forget your password
            </Link>
          </div>

          <Button className="bg-indigo-400" type="submit" variant="contained">
            Sign in
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
