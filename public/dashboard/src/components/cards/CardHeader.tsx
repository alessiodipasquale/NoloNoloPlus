import { Flex } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

function CardHeader({children} : { children: ReactNode})  {
  return (
    <Flex
      height="32px"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
        {children}
    </Flex>
  );
}

export default CardHeader;
