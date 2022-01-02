import {
  Box,
  Button,
  chakra,
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
import React, {
  createRef,
  EventHandler,
  ReactEventHandler,
  KeyboardEvent,
  RefObject,
  useEffect,
  useState,
} from "react";
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
import RentalDetails from "./rentals/RentalDetailsModal";
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
    <Box width="100%">
      Search:
      <Input
        width="full"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        fontSize="1.1rem"
        border="0"
        placeholder={`${count} records...`}
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
  onClickRow,
  variant,
}: {
  columns: Column[];
  data: any;
  caption?: string;
  footer?: any;
  setSelected?: (arg: any) => any;
  onClickRow?: React.MouseEventHandler;
  variant?: string;
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

  const setRowRef = (element: HTMLElement | null, index: number) => {
    rowRefs[index] = element;
  };

  let rowRefs: (HTMLElement | null)[] = rows.map((row) => null);
  const [focusedIndex, onKeyDown] = useTableNavigation(rowRefs);

  const styles = useMultiStyleConfig("GenericTable", { variant });

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
            <Tr {...headerGroup.getHeaderGroupProps()} tabIndex={0}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody
          {...getTableBodyProps()}
          tabIndex={0}
          onKeyDown={(e) => {
            onKeyDown(e);
          }}
        >
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <Tr
                {...row.getRowProps()}
                sx={styles.Tr}
                ref={(element) => setRowRef(element, index)}
                tabIndex={0}

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

function useTableNavigation(rowRefs: (HTMLElement | null)[]) {
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  const onKeyDown = (event: KeyboardEvent<HTMLTableSectionElement>) => {
    const nextRow = () => {
      const next = rowRefs[focusedIndex + 1];
      if (next) {
        setFocusedIndex(focusedIndex + 1);
        console.log(next);
        console.log("next");
        next.focus();
      }
    };
    const previousRow = () => {
      const prev = rowRefs[focusedIndex - 1];
      if (prev) {
        setFocusedIndex(focusedIndex - 1);
        console.log(prev);
        console.log("prev");
        prev.focus();
      }
    };

    const keyMap = {
      ArrowDown: () => nextRow(),
      ArrowUp: () => previousRow(),
    } as { [key: string]: () => any };

    const eventKey = event.key;

    const action = keyMap[eventKey];

    if (action) {
      event.preventDefault();
      action();
    }
  };

  return [focusedIndex, onKeyDown] as const;
}

export default GenericTable;
