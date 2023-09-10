"use client";

import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthLayout } from "@/components/layouts/Auth/AuthLayout";
import Link from "next/link";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { UserProfile } from "@/models";

export interface IpageProps {}

export default function page(props: IpageProps) {
  const initialValue = {
    email: "",
  };

  const handleForgot = async (values: UserProfile) => {
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required!!"),
  });

  return (
    <AuthLayout page="isForgot">
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleForgot(values)}
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
                    label="Email"
                    className="mb-4"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <p className="container my-2 flex-center font-semibold text-gray-600">
                    Remember It? &nbsp;
                    <Link
                      href="/signin"
                      className="text-indigo-700 font-semibold"
                    >
                      Sign In
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
                    Reset
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
