import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTable } from "react-table";
import type { Column } from "react-table"


export default function GenericTable({columns, data, caption, footer} : {columns: Column[], data: any, caption?: string, footer?: any}) {
   data = React.useMemo(
    () => [
      {
        col1: "Hello",

        col2: "World",
      },

      {
        col1: "react-table",

        col2: "rocks",
      },

      {
        col1: "whatever",

        col2: "you want",
      },
    ],

    []
  );

  columns = React.useMemo(
    () => [
      {
        Header: "Column 1",

        accessor: "col1", // accessor is the "key" in the data
      },

      {
        Header: "Column 2",

        accessor: "col2",
      },
    ],

    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  //   useEffect(() => {
  //     //fetch data from db
  //   }, [input]);

  return (
    <Table {...getTableProps()} variant="simple">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Td
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot></Tfoot>
    </Table>
  );
}
