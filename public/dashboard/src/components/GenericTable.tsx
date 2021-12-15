import {
  Box,
  Input,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  IdType,
  Row,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import type { Column, FilterTypes } from "react-table";
import PropTypes from "prop-types";
import RentalDetails from "./rentals/RentalDetails";
import { matchSorter } from "match-sorter";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: {
  preGlobalFilteredRows: Row<{}>[];
  globalFilter: any;
  setGlobalFilter: (filterValue: any) => void;
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Box w="full">
      Search:{" "}
      <Input
      w="full"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </Box>
  );
}

function GenericTable({
  columns,
  data,
  caption,
  footer,
  setSelected,
  onOpen,
  variant
}: {
  columns: Column[];
  data: any;
  caption?: string;
  footer?: any;
  setSelected?: (arg: any) => any;
  onOpen?: any;
  variant?: string
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    rows,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const styles = useMultiStyleConfig("GenericTable", {variant})
  console.log(styles)

  function fuzzyTextFilterFn(
    rows: Row<any>[],
    id: IdType<any>,
    filterValue: any
  ) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: Row<any>[], id: IdType<any>, filterValue: any) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  return (
    <>
      <Table {...getTableProps()} variant="simple">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr ColSpan={visibleColumns.length}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Tr>

          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FaChevronUp />
                        : <FaChevronDown />
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
              <Tr
                {...row.getRowProps()}
                onClick={() => {
                  setSelected && setSelected(row.index);
                  onOpen && onOpen();
                }}
                sx={styles.Tr}
              >
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
