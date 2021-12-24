import React, { useState } from "react";
import { Client } from "../../@types/db-entities";
import CardHeader from "../cards/CardHeader";
import StatCard from "../cards/StatCard";
import { Text } from '@chakra-ui/react';






export default function NewClients({ clients }: { clients: Client[] }) {
  const [selected, setSelected] = useState("all");

  return (
    <>
      <CardHeader>
        <Text variant="card-header">New Clients</Text>
      </CardHeader>
    </>
  );
}
