import {
  Box,
  ComponentWithAs,
  Flex,
  IconProps,
} from "@chakra-ui/react";
import React from "react";

type NavItemContent = {
  leftIcon?: ComponentWithAs<"svg", IconProps>;
  children: React.ReactNode;
};

export default function NavItem({ children, leftIcon }: NavItemContent) {
  return (
    <Flex align="center">
      <Box alignSelf="left">{leftIcon}</Box>
      {children}
    </Flex>
  );
}

export { NavItem };
export type { NavItemContent };
