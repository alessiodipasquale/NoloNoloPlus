import {
  Button, Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import React from "react";
import * as ai from "react-icons/ai";

export function CardMenu<T extends string>({
  selected, setSelected, options,
}: {
  selected: T;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
  options: readonly T[];
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
          <MenuItem key={options[index]} onClick={() => setSelected(elem)}> {elem} </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
