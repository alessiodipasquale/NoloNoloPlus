import Icon from "@chakra-ui/icon";
import { Button, ComponentWithAs, Container, Flex, IconProps, Link, Text } from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom" 
import React from "react";
import palette from "../../palette.json"

type NavItemContent = {
    icon: ComponentWithAs<"svg", IconProps>;
    title: string;
    route: string;
    isOpen: boolean
};


export default function NavItem({icon, title, route, isOpen} : NavItemContent) {

    return (
        <Flex

        >   
            <Button 
            as={Link}
            >
                
                <Flex>
                    <Icon as={icon}/>
                    <Text 

                    >
                        {title}
                    </Text>
                </Flex>
                
            </Button>
        </Flex>
    )
}


export { NavItem }
export type { NavItemContent }