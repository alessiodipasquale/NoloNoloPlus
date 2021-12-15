import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Employee, Rental } from "../../@types/db-entities";
import GenericTable from "../GenericTable";



export default function EmployeesList({
  isLoading,
  employees,
  onOpen,
  setSelected
}: {
  isLoading: boolean;
  employees: Employee[];
  onOpen: any;
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
      onOpen={onOpen}
      setSelected={setSelected}
      variant="withHover"
    />
  );
}
