import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Container, Heading, VStack} from "@chakra-ui/layout";
import { Formik, Form, Field, useField, ErrorMessage, FormikProps} from 'formik';
import React, { MutableRefObject, useRef, useState } from "react";
import * as Yup from "yup"
import path from 'path'
import { consoleTestResultHandler } from "tslint/lib/test";


export default function LoginForm() {

    const form = useRef<HTMLFormElement>(null) 
    //const [user, setUser] = useState({name: '', password: ''})


    function handleSubmit(values, formik) {
        console.log(JSON.stringify(values))
        formik.setSubmitting(false)
        fetch("loginDashboard", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(json => localStorage.setItem('token', json.token))
        
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
                {(formProps: FormikProps<any>) => (
                    <Form>
                        <VStack >
                            <Field name="username">
                                {({ field, form } ) => (
                                    <FormControl 
                                    isInvalid={form.touched.username &&form.errors.username}>
                                        <FormLabel> Username or Email</FormLabel>
                                        <Input {...field} id="name" />
                                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form }) => (
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