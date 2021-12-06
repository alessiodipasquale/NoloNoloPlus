import { IconProps } from "@chakra-ui/icon";
import { Container, Flex, ListItem, UnorderedList, VStack } from "@chakra-ui/layout";
import { Avatar, Button, Divider, Heading, IconButton, Text } from "@chakra-ui/react";
import { ComponentWithAs } from "@chakra-ui/system";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import NavItem from "./NavItem";
import palette from "../../palette.json"


import type { NavItemContent } from "./NavItem"
import { FaIcons } from "react-icons/fa";





export default function Sidebar({navItems}: {navItems: Array<NavItemContent>}) {


    const [isOpen, setOpen] = useState(false)

    const toggleSidebar = () => setOpen(!isOpen)

    return (
        <Flex
        direction="column"
        h="90vh"
        mt="5vh"
        w={isOpen? "250px" : "75px"}
        bgColor={palette["Pewter Blue"]}
        justifyContent="space-between"
        >   

            <Flex
            as="nav"
            >
                <UnorderedList
                listStyleType="none"
                mx="5%"
                p={0}
                >
                    <ListItem>
                        <IconButton
                        icon={<FiMenu />}
                        onClick={toggleSidebar}
                        aria-label="toggle sidebar"
                        />
                    </ListItem>
                    
                    {navItems.map((item: NavItemContent) => 
                        <ListItem
                        h="60px"
                        >
                            <NavItem
                            icon={item.icon} 
                            title={item.title}
                            route={"/"}
                            isOpen={isOpen}
                            />
                        </ListItem>
                    )}
                    
                </UnorderedList>
            </Flex>


            <Flex

            >
                <Divider />
                <Flex>
                    <Avatar />
                    <Flex>
                        <Heading>John Smith</Heading>
                        <Text>Admin</Text>
                    </Flex>
                </Flex>
                

            </Flex>


        </Flex>
        )
}