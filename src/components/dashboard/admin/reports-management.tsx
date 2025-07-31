"use client";

import { DashboardLayout } from "../layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  FileText,
  Download,
  Printer,
  Users,
  BookOpen,
  CalendarDays,
} from "lucide-react";

export function ReportsManagement() {
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                View and manage recently generated reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Generated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.id}
                        </TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="mr-2">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {recentReports.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
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
