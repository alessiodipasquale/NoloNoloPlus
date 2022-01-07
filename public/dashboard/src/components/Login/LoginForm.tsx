import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Container, Heading, VStack} from "@chakra-ui/layout";
import { Formik, Form, Field, useField, ErrorMessage, FormikProps, FormikBag, FormikHandlers, FormikHelpers, FieldInputProps} from 'formik';
import React, { MutableRefObject, useRef, useState } from "react";
import * as Yup from "yup"
import path from 'path'
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { Image } from "@chakra-ui/react";
import logo from '../../LogoAlt.png';

interface FormValues {
    username: string;
    password: string;
}

export default function LoginForm() {
    const navigate = useNavigate()
    const auth = useAuth()
    const location = useLocation()

    let from = location.state?.from?.pathname || "/";

    // function handleSubmit(values : FormValues, formik: FormikHelpers<FormValues>) {
    //     console.log(JSON.stringify(values))
    //     formik.setSubmitting(false)
    //     fetch("loginDashboard", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(values)
    //     })
    //     .then(res => res.json())
    //     .then(json => localStorage.setItem('token', json.token))
    // }

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
                            <Image src={logo} style={{width: '15rem'}}/>
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
                                colorScheme="blue"
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