import React from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import _ from "lodash";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "E-mail",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
];

const Users = () => {
  const [sorting, setSorting] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const users = useLoaderData();

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    manualSorting: true,
    enableMultiSort: true,
    sortDescFirst: false,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      setSearchParams({ sort: `${id}:${desc ? "desc" : "asc"}` });
      console.log(id, desc);
    } else {
      setSearchParams(_.omit(Object.fromEntries(searchParams), "sort"));
    }
  }, [sorting, setSearchParams, searchParams]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: (theme) => theme.palette.grey[100],
                      },
                    }}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{ asc: "☝️", desc: "👇" }[header.column.getIsSorted()]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
