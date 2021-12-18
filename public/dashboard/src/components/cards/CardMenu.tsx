import {
  Button, Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import React from "react";
import * as ai from "react-icons/ai";

export function CardMenu({
  selected, setSelected, options,
}: {
  selected: number | string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
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
