"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { getPaginationRowModel } from "@tanstack/react-table";

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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
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

  const pageCount = Math.ceil(filteredCourses.length / pagination.pageSize);

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "id",
      header: () => <span className="text-slate-300">Course ID</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "name",
      header: () => <span className="text-slate-300">Course Name</span>,
      cell: (info) => (
        <span className="font-medium text-white">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "code",
      header: () => <span className="text-slate-300">Course Code</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "credits",
      header: () => <span className="text-slate-300">Credits</span>,
      cell: (info) => (
        <span className="text-slate-300">{info.getValue() as number}</span>
      ),
    },
    {
      accessorKey: "department",
      header: () => <span className="text-slate-300">Department</span>,
      cell: (info) => (
        <span className="text-slate-300">
          {(info.getValue() as string) || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "instructor",
      header: () => <span className="text-slate-300">Instructor</span>,
      cell: (info) => (
        <span className="text-slate-300">
          {(info.getValue() as string) || "N/A"}
        </span>
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
            onClick={() => handleEditCourse(row.original)}
          >
            <Eye className="h-4 w-4 text-emerald-500" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => deleteCourseMutation.mutate(row.original.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  // Create the table instance for DataTable
  const { table } = useDataTable({
    data: filteredCourses,
    columns,
    pageCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {},
  });

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
              <div className="overflow-x-auto">
                <DataTable table={table} />
              </div>
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
        {selectedCourse && (
          <EditCourseDialog
            course={selectedCourse}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
