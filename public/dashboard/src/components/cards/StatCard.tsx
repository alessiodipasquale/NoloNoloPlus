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
import { valuesIn } from "lodash";
import React, { useState } from "react";
import * as ai from "react-icons/ai";

type StatCardProps = {
  label: string;
  number: number;
  helpText?: string;
};

function CardMenu({ selected, setSelected, options }: {selected: number, setSelected: any, options: string[]}) {
  return (
    <Menu>
      <MenuButton
        fontSize="sm"
        fontWeight="500"
        as={Button}
        rightIcon={<ai.AiFillCaretDown />}
      >
        {options[selected]}
      </MenuButton>
      <MenuList>
        {options.map((elem, index) => (
          <MenuItem onClick={() => setSelected(index)}> {elem} </MenuItem>
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

function StatCard({ label, stats }: { label: string; stats: Stat[] }) {
  const [selected, setSelected] = useState(0);

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
          options={stats.map((stat) => stat.option)}
        />
      </Flex>

      <Flex h="full" direction="column" align="center" justifyContent="Center">
        <Text m="0" p="0" fontSize="4xl" fontWeight="500">
          {stats[selected].value}
        </Text>
        <Text>{stats[selected].helper}</Text>
      </Flex>
    </Flex>
  );
}

export default StatCard;
