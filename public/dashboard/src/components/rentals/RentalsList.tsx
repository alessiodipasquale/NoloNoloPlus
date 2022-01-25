import React, { useCallback, useMemo } from "react";
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
  const data = useMemo(
    () =>
      employeeId !== undefined
        ? rentals.filter((rental) => rental.employeeId === employeeId)
        : rentals,
    [employeeId, rentals]
  );

  const columns = useMemo(() => {
    let columns: Column<Rental>[] = [
      {
        Header: "id",
        accessor: "_id",
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
        id: "details",
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
      });
    }

    return columns;
  }, [onClickRow, setSelected]);

  return (
    <GenericTable
      columns={columns as Column[]}
      data={data}
      setSelected={setSelected}
      onClickRow={onClickRow}
      variant={variant}
    />
  );
}
