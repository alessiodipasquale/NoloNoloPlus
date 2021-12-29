import { Flex, FlexProps } from "@chakra-ui/layout";
import React, { ReactNode } from "react";
import {chakra, forwardRef} from "@chakra-ui/react"
import { StyledOptions } from "@emotion/styled";

// function CardHeader({children, className} : { children: ReactNode, className?: string})  {
//   return (
//     <Flex
//       height="32px"
//       width="100%"
//       justifyContent="space-between"
//       alignItems="center"
//     >
//         {children}
//     </Flex>
//   );
// }

const CardHeader = forwardRef<FlexProps, 'div'>((props, ref) => (
  <Flex height="40px"
  width="100%"
  justifyContent="space-between"
  alignItems="center" ref={ref} {...props} />
))

export default CardHeader;
