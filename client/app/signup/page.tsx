"use client";

import * as React from "react";
import * as Yup from "yup";

import { Form, Formik } from "formik";
import { signin, signup } from "@/lib";
import { socket, specialAndSpace } from "@/constants";

import { AuthLayout } from "@/components/layouts/AuthLayout/AuthLayout";
import Button from "@mui/material/Button";
import { Checkboxes } from "@/components/common/Checkbox/Checkbox";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { io } from "socket.io-client";

export interface IpageProps {}

export default function page(props: IpageProps) {
  const initialValue = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Invalid Username")
      .required("Username is required!!")
      .matches(specialAndSpace, "Cannot contain special characters or spaces"),

    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required!!"),

    email: Yup.string().email().required("Email is required!!"),
  });

  return (
    <AuthLayout page="isSignUp">
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => signup(values)}
          validationSchema={validationSchema}
        >
          {(formikProps) => {
            const {
              dirty,
              isValid,
              isSubmitting,
              handleBlur,
              handleChange,
              touched,
              errors,
            } = formikProps;
            return (
              <Form>
                <div className="flex flex-col">
                  <TextField
                    fullWidth
                    id="outlined-error"
                    label="Username"
                    // defaultValue="Hello World"
                    className="mb-4"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                  />
                  <TextField
                    fullWidth
                    id="outlined-error"
                    label="Password"
                    // defaultValue="Hello World"
                    className="mb-4"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                  />

                  <TextField
                    fullWidth
                    id="outlined-error"
                    label="Email"
                    // defaultValue="Hello World"
                    className="mb-4"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <div className="container my-3 flex items-center justify-between">
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

                  <p className="container my-3 flex-center font-semibold text-gray-600">
                    Already have an account? &nbsp;
                    <Link
                      href="/signin"
                      className="text-indigo-700 font-semibold"
                    >
                      Sign In
                    </Link>
                  </p>

                  <Button
                    className="bg-indigo-400"
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthLayout>
  );
}
