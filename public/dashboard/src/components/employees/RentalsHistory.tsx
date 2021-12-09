import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Rental } from "../../@types/db-entities";
import GenericTable from "../GenericTable";

export default function RentalHistory({
  isLoading,
  data,
  setSelectedRental,
  onOpen,
}: {
  isLoading: boolean;
  data: any;
  setSelectedRental: React.Dispatch<React.SetStateAction<number | null>>;
  onOpen: any
}) {
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
      // {
      //     Header: "start date",
      //     accessor: "startDate"
      // },
      // {
      //     Header: "end date",
      //     accessor: "endDate"
      // },
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
