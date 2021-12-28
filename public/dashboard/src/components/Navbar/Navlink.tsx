import { Link } from "@chakra-ui/layout";
import { Link as RRLink, To } from "react-router-dom";
import React, { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";
import { chakra, Icon } from "@chakra-ui/react";

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
    <Link
      as={RRLink}
      to={to}
      display="flex"
      alignItems="center"
      w="full"
      height="5rem"
      {...rest}
    >
      <Icon minWidth="2rem" minHeight="2rem" margin="0 1.5rem" as={icon} />
      <chakra.span className="link-text" ml="1rem" display="none">
        {children}
      </chakra.span>
    </Link>
  );
}

export default Navlink;
