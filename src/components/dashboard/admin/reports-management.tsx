"use client";
import React from "react";

import { DashboardLayout } from "../layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { getPaginationRowModel } from "@tanstack/react-table";
import {
  FileText,
  Download,
  Printer,
  Users,
  BookOpen,
  CalendarDays,
} from "lucide-react";

export function ReportsManagement() {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Dummy data for recent reports
  const recentReports = [
    {
      id: "RPT001",
      name: "Student Enrollment Summary (Q1 2024)",
      type: "Student",
      date: "2024-03-31",
      status: "Completed",
    },
    {
      id: "RPT002",
      name: "Course Performance Analysis (Spring 2023)",
      type: "Course",
      date: "2023-06-15",
      status: "Completed",
    },
    {
      id: "RPT003",
      name: "Attendance Overview (March 2024)",
      type: "Attendance",
      date: "2024-04-01",
      status: "Completed",
    },
    {
      id: "RPT004",
      name: "Faculty Workload Report",
      type: "Faculty",
      date: "2024-02-28",
      status: "Pending",
    },
  ];

  type Report = (typeof recentReports)[number];

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "id",
      header: () => <span className="text-slate-300">Report ID</span>,
      cell: (info) => (
        <span className="font-medium">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "name",
      header: () => <span className="text-slate-300">Name</span>,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "type",
      header: () => <span className="text-slate-300">Type</span>,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "date",
      header: () => <span className="text-slate-300">Date Generated</span>,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "status",
      header: () => <span className="text-slate-300">Status</span>,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      id: "actions",
      header: () => <span className="text-slate-300">Actions</span>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="mr-2">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
        </div>
      ),
    },
  ];

  const pageCount = Math.ceil(recentReports.length / pagination.pageSize);
  const { table } = useDataTable({
    data: recentReports,
    columns,
    pageCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {},
  });

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports Management</h1>
          <p className="text-muted-foreground">
            Generate and manage various reports for your institution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generate New Report */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Select a report type to generate a new report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
              >
                <Users className="h-4 w-4" />
                Student Reports
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
              >
                <BookOpen className="h-4 w-4" />
                Course Reports
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
              >
                <CalendarDays className="h-4 w-4" />
                Attendance Reports
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
              >
                <FileText className="h-4 w-4" />
                Financial Reports
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-white">Recent Reports</CardTitle>
              <CardDescription className="text-slate-400">
                View and manage recently generated reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <DataTable table={table} />
              </div>
              {recentReports.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  No recent reports found.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
  // Apply the same card, table, and color scheme as students-management.tsx
}
