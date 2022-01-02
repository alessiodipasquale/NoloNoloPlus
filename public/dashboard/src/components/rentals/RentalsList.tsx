import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Rental } from "../../@types/db-entities";
import GenericTable from "../GenericTable";
import { Cell, Column } from "react-table";
import { FaChevronRight } from "react-icons/fa";
import Icon from "@chakra-ui/icon";
export default function RentalsList({
  rentals,
  employeeId,
  onClickRow,
  setSelected,
  variant,
}: {
  rentals: Rental[];
  onClickRow?: React.MouseEventHandler;
  employeeId?: string;
  setSelected?: React.Dispatch<React.SetStateAction<number | undefined>>;
  variant?: string;
}) {
  const data = employeeId
    ? rentals
    : rentals.filter((rental) => rental._id === employeeId);

  const columns = useMemo(() => {
    let columns: Column[] = [
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
    ];
    if (onClickRow) {
      columns.push({
        Header: "",
        accessor: "details",
        Cell: ({ cell }: { cell: Cell }) => (
          <button
            onClick={(e) => {
              setSelected && setSelected(cell.row.index);
              onClickRow && onClickRow(e);
            }}
          >
            <Icon as={FaChevronRight} />
          </button>
        ),
      });
    }
    return columns;
  }, [onClickRow, setSelected]);

  return (
    <GenericTable
      columns={columns}
      data={data}
      setSelected={setSelected}
      onClickRow={onClickRow}
      variant={variant}
    />
  );
}
