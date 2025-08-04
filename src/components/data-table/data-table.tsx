import * as React from "react";
import { flexRender, Table } from "@tanstack/react-table";

interface DataTableProps<T> {
  table: Table<T>;
  noPagination?: boolean;
}

export function DataTable<T>({ table, noPagination }: DataTableProps<T>) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination?.pageIndex ?? 0;
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-slate-700 hover:bg-slate-700/50"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-slate-800 divide-y divide-slate-700">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-slate-700 hover:bg-slate-700/50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-slate-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!noPagination && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
          <div className="flex items-center gap-2 text-slate-400">
            <span>
              Page {pageIndex + 1} of {pageCount}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
              onClick={() => table.previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>
            <button
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
              onClick={() => table.nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
