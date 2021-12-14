import { Flex, Heading } from "@chakra-ui/layout";
import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as ai from "react-icons/ai";

type StatCardProps = {
  label: string;
  number: number;
  helpText?: string;
};

function CardMenu({
  selected,
  setSelected,
  options,
}: {
  selected: string;
  setSelected: any;
  options: string[];
}) {
  return (
    <Menu>
      {options.length > 1 && (
        <MenuButton
          size="sm"
          variant="ghost"
          fontWeight="500"
          as={Button}
          rightIcon={<ai.AiFillCaretDown />}
        >
          {selected}
        </MenuButton>
      )}
      <MenuList>
        {options.map((elem, index) => (
          <MenuItem onClick={() => setSelected(elem)}> {elem} </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

type Stat = {
  option: string;
  value: number;
  helper?: string | number;
};

function StatCard({
  label,
  options,
  data: values,
}: {
  label: string;
  options: string[];
  data: { [key: string]: {value: number | string, helper: JSX.Element} };
}) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Flex h="full" direction="column">
      <Flex
        w="full"
        justify="space-between"
        alignItems="baseline"
        borderBottom={`1px solid grey.400`}
      >
        <Text fontSize="sm" fontWeight="600">
          {label}
        </Text>
        <CardMenu
          selected={selected}
          setSelected={setSelected}
          options={options}
        />
      </Flex>
    
      <Flex h="full" direction="column" align="center" justifyContent="Center">
        <Text m="0" p="0" fontSize="4xl" fontWeight="500">
          {values[selected].value}
        </Text>

        {values[selected].helper}
       
      </Flex>
    </Flex>
  );
}

export default StatCard;
