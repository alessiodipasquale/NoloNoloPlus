import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { getPercentDiff } from "../rentals/fillMissingMissing";

export default function getPercentHelper(a: number, b: number) {
    if (!a || !b) {
      return <></>;
    }
    const diff = getPercentDiff(a, b);

    let arrow;
    if (diff >= 0) {
      arrow = <ArrowUpIcon color="green" />;
    } else {
      arrow = <ArrowDownIcon color="red" />;
    }
    return (
      <HStack>
        {arrow}
        <Text>{diff.toFixed(2).toString() + "%"}</Text>
      </HStack>
    );
  }