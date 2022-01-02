import { Input } from "@chakra-ui/input";
import { Container, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { ReactNode, useState } from "react";

function Note({
  author,
  color,
  children,
}: {
  author?: string;
  color?: string;
  children: ReactNode;
}) {
  const defaultColor = "gray.200";
  // lineChart1const [color, setColor] = useState('grey.50')

  return (
    <Container
      p={0}
      height="10rem"
      borderRadius="base"
      backgroundColor={color || defaultColor}
    >
      <Text m={0} px="1rem" py="0.5rem">
        {children}
      </Text>
    </Container>
  );
}

export default Note;
