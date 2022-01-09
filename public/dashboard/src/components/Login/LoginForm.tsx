import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, VStack } from "@chakra-ui/layout";
import { Field, FieldInputProps, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from "react";
import { useLocation, useNavigate, Location } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "./AuthProvider";


interface FormValues {
    username: string;
    password: string;
}

interface LocationState {
    from : {
        pathname: string;
    }
}

export default function LoginForm() {
    const navigate = useNavigate()
    const auth = useAuth()
    const location  = useLocation()
    const state = location.state as LocationState

    let from = state?.from?.pathname || "/";



    function handleSubmit(values : FormValues, formik: FormikHelpers<FormValues>) {
        auth.signin(values, () => {
          // Send them back to the page they tried to visit when they were
          // redirected to the login page. Use { replace: true } so we don't create
          // another entry in the history stack for the login page.  This means that
          // when they get to the protected page and click the back button, they
          // won't end up back on the login page, which is also really nice for the
          // user experience.
          formik.setSubmitting(false)
          navigate(from, { replace: true });
        });
      }


    return (
        <Center>
            <Formik
            initialValues={{
                username:"",
                password:"",
            }}
            validationSchema={Yup.object({
                username: Yup.string()
                .required("Required"),
                password: Yup.string()
                .required("Required")
            })}
            onSubmit={(values, formik) => handleSubmit(values, formik)}
            >
                {(formProps: FormikProps<FormValues>) => (
                    <Form>
                        <VStack >
                            <Field name="username">
                                {({ field , form }: {field: FieldInputProps<string>, form: any} ) => (
                                    <FormControl 
                                    isInvalid={form.touched.username && form.errors.username}>
                                        <FormLabel> Username or Email</FormLabel>
                                        <Input {...field} id="name" />
                                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form }: {field: FieldInputProps<string>, form: any}) => (
                                    <FormControl 
                                    isInvalid={form.touched.password &&form.errors.password}>
                                        <FormLabel>Password</FormLabel>
                                        <Input {...field} id="password" type="password"/>
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                colorScheme="teal"
                                w="full"
                                isLoading={formProps.isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Center>
    )
}