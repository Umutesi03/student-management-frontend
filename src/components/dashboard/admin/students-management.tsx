"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DashboardLayout } from "../layout/dashboard-layout";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
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

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

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
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700 hover:bg-slate-700/50">
                        <TableHead className="text-slate-300">
                          User ID
                        </TableHead>
                        <TableHead className="text-slate-300">Name</TableHead>
                        <TableHead className="text-slate-300">Email</TableHead>
                        <TableHead className="text-slate-300">Phone</TableHead>
                        <TableHead className="text-slate-300">
                          Address
                        </TableHead>
                        <TableHead className="text-slate-300">Role</TableHead>
                        <TableHead className="text-slate-300">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentStudents.map(
                        (student: Student, index: number) => (
                          <TableRow
                            key={student.id}
                            className="border-slate-700 hover:bg-slate-700/30"
                          >
                            <TableCell className="text-slate-300">
                              {startIndex + index + 1}
                            </TableCell>
                            <TableCell className="font-medium text-white">
                              {student.fullName}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {student.email}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {student.phone || "N/A"}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              N/A
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  student.role === "admin"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  student.role === "admin"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-slate-600 text-slate-200"
                                }
                              >
                                {student.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
                                  onClick={() => handleEditStudent(student)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() =>
                                    deleteStudentMutation.mutate(student.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Rows Per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(Number(e.target.value))}
                      className="bg-slate-700 border-slate-600 text-white rounded px-2 py-1"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-slate-400">
                      {startIndex + 1}-
                      {Math.min(endIndex, filteredStudents.length)} of{" "}
                      {filteredStudents.length}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
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
