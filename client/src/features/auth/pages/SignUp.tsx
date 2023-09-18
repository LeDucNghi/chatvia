import * as Yup from "yup";

import { Button, Link, TextField } from "@mui/material";
import { Form, Formik } from "formik";

import { AuthLayout } from "../../../components/layouts/Auth/AuthLayout";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserProfile } from "../../../models";
import { signup } from "../authThunk";
import { specialAndSpace } from "../../../constants";
import { useAppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (values: UserProfile) => {
    dispatch(signup(values));
  };

  return (
    <AuthLayout
      layoutDescription="Get your Chatvia account now."
      title="Sign In"
    >
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleSubmit(values)}
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
                <div className="flex flex-col ">
                  <div className="mb-4">
                    <TextField
                      type="text"
                      fullWidth
                      id="outlined-error"
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && Boolean(errors.username)}
                    />
                  </div>

                  <div className="mb-4">
                    <TextField
                      type="password"
                      fullWidth
                      id="outlined-error"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={touched.password && Boolean(errors.password)}
                    />
                  </div>

                  <TextField
                    fullWidth
                    id="outlined-error"
                    label="Email"
                    className="mb-4"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <div className="container my-2 flex justify-center text-gray-400">
                    <Button
                      onClick={() => navigate("/forgot")}
                      className="text-sm mx-auto"
                    >
                      Forget your password
                    </Button>
                  </div>

                  <p className="container my-3 flex-center font-semibold text-gray-600">
                    Already have an account? &nbsp;
                    <Link href="/" className="text-indigo-700 font-semibold">
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
