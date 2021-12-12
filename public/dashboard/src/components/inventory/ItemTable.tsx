import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Item } from "../../@types/db-entities";
import GenericTable from "../GenericTable";

export default function ItemTable({
  isLoading,
  data,
  setSelected,
  onOpen,
}: {
  isLoading: boolean;
  data: Item[];
  setSelected?: React.Dispatch<React.SetStateAction<number | null>>;
  onOpen?: any
}) {
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "_id",
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "available",
        accessor: "available",
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
        Header: "standardPrice",
        accessor: "standardPrice",
      }
    ],
    []
  );

  return isLoading ? (
    <p>loading</p> 
  ) : (
    <GenericTable columns={columns} data={data} setSelected={setSelected} onOpen={onOpen} />
  );
}