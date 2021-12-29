import { Link } from "@chakra-ui/layout";
import { NavLink, To } from "react-router-dom";
import React, { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";
import { chakra, Icon } from "@chakra-ui/react";


const ChakraNavLink = chakra(NavLink); 


function Navlink({
  to,
  icon,
  children,
  ...rest
}: {
  to: To;
  icon: IconType;
  children: ReactNode;
}) {
  return (
    <ChakraNavLink
      to={to}
      display="flex"
      alignItems="center"
      w="full"
      height="5rem"
      style={({isActive}) => ({
        color: isActive ? "green" : "blue"
      })}
      {...rest}
    >
      <Icon minWidth="2rem" minHeight="2rem" margin="0 1.5rem" as={icon} />
      <chakra.span className="link-text" ml="1rem" display="none">
        {children}
      </chakra.span>
    </ChakraNavLink>
  );
}

export default Navlink;
