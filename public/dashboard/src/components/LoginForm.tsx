import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Heading, VStack} from "@chakra-ui/layout";
import React, {useState} from "react";



const admin = {
    user: 'test',
    password: 123,
}


export default function LoginForm() {



    
    const [user, setUser] = useState('');
    const [details, setDetails] = useState({name: '', password: ''});

    function submitHandler(e: React.FormEvent) {
        e.preventDefault();
        console.log(details)
    }


    return (
        <VStack as="form" onSubmit={submitHandler}>
            <Heading>Login</Heading>
            <FormControl id={"username"} isRequired>
                <FormLabel>Username or Email</FormLabel>
                <Input onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
            </FormControl>
            <FormControl id={"password"} isRequired >
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </FormControl>
            <Button type="submit" w="full">Login</Button>
        </VStack>
    )
}