import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSortBy, useTable } from "react-table";
import type { Column } from "react-table";
import PropTypes from "prop-types";
import RentalDetails from "./employees/RentalDetails";

function GenericTable({
  columns,
  data,
  caption,
  footer,
  setSelected,
  onOpen,
}: {
  columns: Column[];
  data: any;
  caption?: string;
  footer?: any;
  setSelected: (arg: any) => any;
  onOpen: any
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);


  return (
    <>

      <Table {...getTableProps()} variant="simple">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()}
              onClick={() => {setSelected(row.index); onOpen()}}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>{footer}</Tfoot>
      </Table>
    </>
  );
}

export default GenericTable;
