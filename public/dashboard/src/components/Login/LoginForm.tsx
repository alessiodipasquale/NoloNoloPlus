import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, VStack } from "@chakra-ui/layout";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
  useFormik,
} from "formik";
import React from "react";
import { useLocation, useNavigate, Location } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "./AuthProvider";
import { Image } from "@chakra-ui/react";
import logo from "../../LogoAlt.png";
import { HTTPError } from "ky";

interface FormValues {
  username: string;
  password: string;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

export default function LoginForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const state = location.state as LocationState;
  let from = state?.from?.pathname || "/";

  async function handleSubmit(
    values: FormValues,
    formik: FormikHelpers<FormValues>
  ) {
    try {
      await auth.signin(values);
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof HTTPError) {
        if (err.response.status === 401) {
          formik.setStatus( {error: "Invalid Username or password"});
        }
      }
    } finally {
      formik.setSubmitting(false);
    }
  }

  return (
    <Center>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, formik) => handleSubmit(values, formik)}
      >
        {(formik: FormikProps<FormValues>) => (
          <Form>
            <VStack>
              <Image src={logo} style={{ width: "15rem" }} />
              <Field name="username">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: any;
                }) => (
                  <FormControl
                    isInvalid={form.touched.username && form.errors.username}
                  >
                    <FormLabel> Username or Email</FormLabel>
                    <Input {...field} id="name" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: any;
                }) => (
                  <FormControl
                    isInvalid={form.touched.password && form.errors.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input {...field} id="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="blue"
                w="full"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              { formik.status && <FormErrorMessage>{formik.status?.error}</FormErrorMessage>}
            </VStack>
          </Form>
        )}
      </Formik>
    </Center>
  );
}
