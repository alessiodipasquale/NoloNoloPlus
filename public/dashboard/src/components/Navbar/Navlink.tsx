import { Link } from "@chakra-ui/layout";
import { NavLink, NavLinkProps, To } from "react-router-dom";
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
} & NavLinkProps &
  React.RefAttributes<HTMLAnchorElement>) {
  return (
    <ChakraNavLink
      to={to}
      display="flex"
      alignItems="center"
      {...rest}
      w={{ base: "5rem", md: "full" }}
      height="5rem"
      style={({ isActive }) => ({
        color: isActive ? "#21A8D8" : "white",
      })}
      _hover= {{ color: "#21A8D8 !important", opacity: 0.5 }}
      transition="color 100ms ease-in, opacity 100ms ease-in"
      label={"go to " + children}
      aria-labelledby={children?.toString()}
    >
      <Icon
        minWidth="2rem"
        minHeight="2rem"
        margin="0 1.5rem"
        as={icon}
        role="presentation"
      />
      <chakra.span
        id={children?.toString()}
        className="link-text"
        ml="1rem"
        display="none"
      >
        {children}
      </chakra.span>
    </ChakraNavLink>
  );
}

export default Navlink;
