import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Employee, Rental } from "../../@types/db-entities";
import GenericTable from "../GenericTable";



export default function EmployeesList({
  isLoading,
  employees,
  onClickRow,
  setSelected
}: {
  isLoading: boolean;
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
    ],
    []
  );

  return isLoading ? (
    <p>loading</p>
  ) : (
    <GenericTable
      columns={columns}
      data={employees}
      onClickRow={onClickRow}
      setSelected={setSelected}
      variant="withHover"
    />
  );
}
