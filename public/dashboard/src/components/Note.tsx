import { Input } from "@chakra-ui/input";
import { Container, Text } from "@chakra-ui/layout";
import React, { useState } from "react";

function Note({
  children,
  author,
  color,
}: {
  children: any;
  author: string;
  color?: string;
}) {
  const defaultColor = "gray.200";
  // lineChart1const [color, setColor] = useState('grey.50')
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Container
      height="10rem"
      borderRadius="base"
      backgroundColor={color || defaultColor}
      onDoubleClick={() => setIsEditing(true)}
    >
      {!isEditing ? <Text>{children}</Text> : <Input>{children}</Input>}
    </Container>
  );
}

export default Note;
