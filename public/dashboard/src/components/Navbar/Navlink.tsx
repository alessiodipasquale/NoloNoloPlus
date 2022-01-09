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
      w={{base: "5rem", md: "full"}}
      height="5rem"
      style={({isActive}) => ({
        color: isActive ? "#21A8D8" : "white"
      })}
      {...rest}
      label={"go to " + children}
      aria-labelledby={children!.toString()}
    >
      <Icon minWidth="2rem" minHeight="2rem" margin="0 1.5rem"  as={icon} role="presentation" />
      <chakra.span id={children!.toString()} className="link-text" ml="1rem" display="none" style={{color: 'white'}}>
        {children}
      </chakra.span>
    </ChakraNavLink>
  );
}

export default Navlink;
