import { Input } from "@chakra-ui/input";
import { Container, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";

function Note({ author, color }: { author: string; color?: string }) {
  const defaultColor = "gray.200";
  // lineChart1const [color, setColor] = useState('grey.50')
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");

  return (
    <Container
      p={0}
      height="10rem"
      borderRadius="base"
      backgroundColor={color || defaultColor}
      onDoubleClick={() => setIsEditing(true)}
    >
      {!isEditing ? (
        <Text m={0} px="1rem" py="0.5rem" onClick={() => setIsEditing(true)}>
          {content}
        </Text>
      ) : (
        <Textarea
          m={0}
          px="1rem"
          py="0.5rem"
          w="full"
          h="full"
          resize="none"
          type="text"
          focusBorderColor="none"
          value={content}
          onBlur={() => setIsEditing(false)}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      )}
    </Container>
  );
}

export default Note;
