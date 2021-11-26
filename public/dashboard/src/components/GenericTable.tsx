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
import { useSortBy, useTable } from "react-table";
import type { Column } from "react-table"
import PropTypes from "prop-types";


function GenericTable({columns, data, caption, footer} : {columns: Column[], data: any, caption?: string, footer?: any}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  

  return (
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
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
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
      <Tfoot>{footer}</Tfoot>
    </Table>
  );
}


export default GenericTable;