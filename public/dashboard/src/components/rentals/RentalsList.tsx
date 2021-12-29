import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Rental } from "../../@types/db-entities";
import GenericTable from "../GenericTable";

export default function RentalsList({
  rentals,
  employeeId,
  isLoading,
  onClickRow,
  setSelected,
  variant
}: {
  isLoading: boolean;
  rentals: Rental[];
  onClickRow: any
  employeeId?: string,
  setSelected?: React.Dispatch<React.SetStateAction<number | undefined>>;
  variant?: string
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
      }
    ],
    []
  );

  return isLoading ? (
    <p>loading</p> 
  ) : (
    <GenericTable columns={columns} data={data} setSelected={setSelected} onClickRow={onClickRow} variant={variant} />
  );
}
