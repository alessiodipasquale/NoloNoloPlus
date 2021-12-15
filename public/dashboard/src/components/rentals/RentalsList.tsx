import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Rental } from "../../@types/db-entities";
import GenericTable from "../GenericTable";

export default function RentalsList({
  isLoading,
  rentals,
  setSelectedRental,
  onOpen,
  employeeId
}: {
  isLoading: boolean;
  rentals: Rental[];
  onOpen: any
  setSelectedRental?: React.Dispatch<React.SetStateAction<number | null>>;
  employeeId?: string,
}) {

  const data = employeeId ? rentals : rentals.filter(rental => rental._id === employeeId)


  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "_id",
      },
      {
        Header: "client id",
        accessor: "clientId",
      },
      {
        Header: "item id",
        accessor: "itemId",
      },
      {
        Header: "status",
        accessor: "state",
      },
      {
        Header: "final price",
        accessor: "finalPrice",
      },
      {
        Header: "details"
      }
    ],
    []
  );

  return isLoading ? (
    <p>loading</p> 
  ) : (
    <GenericTable columns={columns} data={data} setSelected={setSelectedRental} onOpen={onOpen} />
  );
}