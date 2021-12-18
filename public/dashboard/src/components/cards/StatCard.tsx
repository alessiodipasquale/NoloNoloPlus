import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Divider, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CardMenu } from "./CardMenu";


function StatCard({
  value,
  helper,
}: {
  value: number | string;
  helper?: React.ReactNode;
}) {
  return (
    <Flex h="full" direction="column" align="center" justifyContent="Center">
      <Text m="0" p="0" fontSize="4xl" fontWeight="500">
        {value}
      </Text>
      <Box>{helper}</Box>
    </Flex>
  );
}

export default StatCard;
