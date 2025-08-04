import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  TableOptions,
  Table,
} from "@tanstack/react-table";

interface UseDataTableProps<T> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  data: T[];
  columns: ColumnDef<T>[];
  pageCount?: number;
  initialState?: Partial<TableOptions<T>["state"]>;
}

export function useDataTable<T>({ data, columns, pageCount = 1, initialState = {}, ...options }: UseDataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: initialState,
    getCoreRowModel: getCoreRowModel(),
    ...options,
  });
  return { table };
}
