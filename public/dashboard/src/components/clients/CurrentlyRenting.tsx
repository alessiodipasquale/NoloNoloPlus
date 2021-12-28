import React, { useMemo, useState } from "react";
import { Client, Rental } from "../../@types/db-entities";
import CardHeader from "../cards/CardHeader";
import StatCard from "../cards/StatCard";
import { Text } from "@chakra-ui/react";

export default function CurrentlyRenting({ rentals }: { rentals: Rental[] }) {
  const activeClientsIds = useMemo(() => {
    const activeRentals = rentals.filter(
      (rental) => rental.state === "in corso"
    );
    return Array.from(new Set(activeRentals.map((rental) => rental.clientId)));
  }, [rentals]);

  return (
    <>
      <CardHeader>
        <Text variant="card-header">Currently renting</Text>
      </CardHeader>

      {activeClientsIds && (
        <StatCard value={activeClientsIds.length} />
      )}
    </>
  );
}
