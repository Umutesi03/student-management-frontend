"use client";

import { useState } from "react";

type Course = {
  id: string;
  name: string;
  code: string;
  credits: number;
  department?: string;
  instructor?: string;
};
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
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { coursesApi } from "../../../lib/api";
import { useAuthStore } from "../../../lib/auth";
import { AddCourseDialog } from "./add-course-dialog";
import { AssignCourseDialog } from "./assign-course-dialog";
import { EditCourseDialog } from "./edit-course-dialog";

export function CoursesManagement() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => coursesApi.getAllCourses(token!),
    enabled: !!token,
  });

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => coursesApi.deleteCourse(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted successfully");
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        toast.error(
          (error as { message?: string }).message || "Failed to delete course"
        );
      } else {
        toast.error("Failed to delete course");
      }
    },
  });

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setEditDialogOpen(true);
  };

  const filteredCourses =
    (courses as Course[] | undefined)?.filter(
      (course: Course) =>
        course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  if (error) {
    toast.error(
      `Error loading courses: ${(error as { message?: string })?.message}`
    );
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Courses</h1>
            <p className="text-slate-400">
              Manage all academic courses in your institution
            </p>
          </div>
          <div className="flex gap-2">
            <AssignCourseDialog />
            <AddCourseDialog />
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-white">
                All Courses ({courses?.length || 0})
              </CardTitle>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search courses..."
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
                          Course ID
                        </TableHead>
                        <TableHead className="text-slate-300">
                          Course Name
                        </TableHead>
                        <TableHead className="text-slate-300">
                          Course Code
                        </TableHead>
                        <TableHead className="text-slate-300">
                          Credits
                        </TableHead>
                        <TableHead className="text-slate-300">
                          Department
                        </TableHead>
                        <TableHead className="text-slate-300">
                          Instructor
                        </TableHead>
                        <TableHead className="text-slate-300">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentCourses.map((course: Course, index: number) => (
                        <TableRow
                          key={course.id}
                          className="border-slate-700 hover:bg-slate-700/30"
                        >
                          <TableCell className="text-slate-300">
                            {startIndex + index + 1}
                          </TableCell>
                          <TableCell className="font-medium text-white">
                            {course.name}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {course.code}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {course.credits}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {course.department || "N/A"}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {course.instructor || "N/A"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                className="h-8 w-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
                                onClick={() => handleEditCourse(course)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                onClick={() =>
                                  deleteCourseMutation.mutate(course.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
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
                      {Math.min(endIndex, filteredCourses.length)} of{" "}
                      {filteredCourses.length}
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
            {filteredCourses.length === 0 && !isLoading && (
              <div className="text-center py-8 text-slate-400">
                {searchTerm
                  ? "No courses found matching your search."
                  : "No courses found."}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Course Dialog */}
        <EditCourseDialog
          course={selectedCourse}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      </div>
    </DashboardLayout>
  );
}
