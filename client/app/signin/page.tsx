"use client";

import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthLayout } from "@/components/layouts/Auth/AuthLayout";
import Link from "next/link";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { UserProfile } from "@/models";
import { cookies } from "@/utils";
import { signin } from "@/lib";
import { specialAndSpace } from "@/constants";
import { useRouter } from "next/navigation";

type Props = {};

export default function SignIn({}: Props) {
  const router = useRouter();

  const initialValue = {
    username: "",
    password: "",
  };

  const handleSignIn = async (values: UserProfile) => {
    const res = await signin(values);

    if (res) {
      console.log("🚀 ~ file: page.tsx:30 ~ handleSignIn ~ res:", res);
      router.push("/dashboard");
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Invalid Username")
      .required("Username is required!!")
      .matches(specialAndSpace, "Cannot contain special characters or spaces"),

    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required!!"),
  });

  return (
    <AuthLayout page="isSignIn">
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleSignIn(values)}
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
                    type="text"
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
                    type="password"
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

                  <div className="container my-2 flex items-center justify-between">
                    {/* <Checkboxes
                      name="Remember me"
                      value="Remember me"
                      handleChange={handleChange}
                      type="checkbox"
                      className="text-sm flex items-center"
                    /> */}

                    <Link
                      href="/forgot"
                      className="text-sm mx-auto text-gray-400"
                    >
                      Forget your password
                    </Link>
                  </div>

                  <p className="container my-2 flex-center font-semibold text-gray-600">
                    Do not have an account? &nbsp;
                    <Link
                      href="/signup"
                      className="text-indigo-700 font-semibold"
                    >
                      Sign Up Now
                    </Link>
                  </p>

                  <LoadingButton
                    className={`bg-indigo-400 ${
                      !dirty || !isValid || isSubmitting
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    loading={isSubmitting}
                  >
                    Sign in
                  </LoadingButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthLayout>
  );
}
