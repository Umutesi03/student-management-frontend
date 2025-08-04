"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DashboardLayout } from "../layout/dashboard-layout";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { getPaginationRowModel } from "@tanstack/react-table";
import { Badge } from "../../ui/badge";
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { adminApi } from "../../../lib/api";
import { useAuthStore } from "../../../lib/auth";
import { AddStudentDialog } from "./add-student-dialog";
import { AssignCourseDialog } from "./assign-course-dialog";
import { EditStudentDialog } from "./edit-student-dialog";

export function StudentsManagement() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
  type Student = {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    role?: string;
  };
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () => adminApi.getStudents(token!),
    enabled: !!token,
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteStudent(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully");
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        toast.error(
          (error as { message?: string }).message || "Failed to delete student"
        );
      } else {
        toast.error("Failed to delete student");
      }
    },
  });

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setEditDialogOpen(true);
  };

  const filteredStudents =
    (students as Student[] | undefined)?.filter(
      (student: Student) =>
        student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const pageCount = Math.ceil(filteredStudents.length / pagination.pageSize);

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "id",
      header: () => <span className="text-slate-300">User ID</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as string}</span>
      ),
    },

    {
      accessorKey: "fullName",
      header: () => <span className="text-slate-300">Name</span>,
      cell: (info) => (
        <span className="font-medium text-white">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: () => <span className="text-slate-300">Email</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <span className="text-slate-300">Phone</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "address",
      header: () => <span className="text-slate-300">Address</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "role",
      header: () => <span className="text-slate-300">Role</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as string}</span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="text-slate-300">Actions</span>,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleEditStudent(row.original)}
          >
            <Eye className="h-4 w-4 text-emerald-500" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => deleteStudentMutation.mutate(row.original.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  // Create the table instance for DataTable
  const { table } = useDataTable({
    data: filteredStudents,
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Students</h1>
            <p className="text-slate-400">
              Manage all students in your institution
            </p>
          </div>
          <div className="flex gap-2">
            <AssignCourseDialog />
            <AddStudentDialog />
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-white">
                All Students ({students?.length || 0})
              </CardTitle>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-[300px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <DataTable table={table} />
              </div>
            )}
            {filteredStudents.length === 0 && !isLoading && (
              <div className="text-center py-8 text-slate-400">
                {searchTerm
                  ? "No students found matching your search."
                  : "No students found."}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Student Dialog */}
        {selectedStudent && (
          <EditStudentDialog
            student={selectedStudent}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
