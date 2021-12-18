import React from "react";
import { Item } from "../../@types/db-entities";
import StatCard from "../cards/StatCard";
import { Button, Flex, Text } from "@chakra-ui/react";
import CardHeader from "../cards/CardHeader";

function AvailableCard({ items }: { items: Item[] }) {
  const available = items.filter((item) => item.available);

  const data = {
    available: {
      value: "" + available.length.toString() + "/" + items.length.toString(),
      helper: <></>,
    },
  };

  return (
    <>
      <CardHeader>
        <Text variant="card-header">Available items</Text>
      </CardHeader>
      <StatCard value={data.available.value} />
    </>
  );
}

export default AvailableCard;
