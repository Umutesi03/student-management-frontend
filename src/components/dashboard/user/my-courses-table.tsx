import * as React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";

type Course = {
  id: number;
  name: string;
  code: string;
  description: string;
  credits: number;
};

interface MyCoursesTableProps {
  courses: Course[];
}

export function MyCoursesTable({ courses }: MyCoursesTableProps) {
  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "name",
      header: "Course Name",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "credits",
      header: "Credits",
    },
  ];

  const { table } = useDataTable({
    data: courses,
    columns,
    pageCount: 1,
    initialState: {},
  });

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-lg font-semibold">My Enrolled Courses</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-black">
        <DataTable table={table} noPagination />
      </div>
    </div>
  );
}
