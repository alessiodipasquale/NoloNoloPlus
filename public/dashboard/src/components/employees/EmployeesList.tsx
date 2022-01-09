import { Icon } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Cell } from "react-table";
import { Employee, Rental } from "../../@types/db-entities";
import GenericTable from "../GenericTable";



export default function EmployeesList({
  employees,
  onClickRow,
  setSelected
}: {
  employees: Employee[];
  onClickRow: any;
  setSelected: any;
}) {
  const columns = useMemo(
    () => [
      {
        Header: "username",
        accessor: "username",
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "surname",
        accessor: "surname",
      },
      {
        Header: "address",
        accessor: "address",
      },
      {
        Header: "",
        accessor: "details",
        Cell: ({ cell }: { cell: Cell }) => (
          <button
            onClick={(e) => {
              setSelected && setSelected(cell.row.index);
              onClickRow && onClickRow(e);
            }}
            aria-label="see details"
          >
            <Icon role="presentation" as={FaChevronRight} />
          </button>
        ),
      },
    ],
    [onClickRow, setSelected]
  );

  return (
    <GenericTable
      columns={columns}
      data={employees}
      onClickRow={onClickRow}
      setSelected={setSelected}
      variant="withHover"
    />
  );
}
