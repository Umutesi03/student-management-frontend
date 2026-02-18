"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useCourses,
  useDeleteCourse,
} from "@/features/courses/hooks/use-courses";
import { LoadingState, TableSkeleton } from "@/shared/components/loading";
import { ErrorState, EmptyState } from "@/shared/components/error-states";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Search,
  Eye,
  Trash2,
  Plus,
  BookOpen,
  MoreHorizontal,
  Edit,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Course } from "@/shared/types";

export function CoursesTable() {
  const { data: courses, isLoading, error } = useCourses();
  const deleteMutation = useDeleteCourse();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses.filter(
      (course: Course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const handleDelete = async (id: string, name: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        // Error is handled by the mutation hook
      }
    }
  };

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "code",
      header: "Course Code",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono text-xs">
          {row.getValue("code")}
        </Badge>
      ),
    },
    {
      accessorKey: "name",
      header: "Course Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-300">
          {(row.getValue("department") as string) || "Not specified"}
        </div>
      ),
    },
    {
      accessorKey: "instructor",
      header: "Instructor",
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-300">
          {(row.getValue("instructor") as string) || "Not assigned"}
        </div>
      ),
    },
    {
      accessorKey: "credits",
      header: "Credits",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("credits")} credits</Badge>
      ),
    },
    {
      id: "enrollments",
      header: "Students",
      cell: ({ row }) => {
        const course = row.original;
        const enrollmentCount = course.enrolledStudents?.length || 0;

        return (
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{enrollmentCount}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const course = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/admin/courses/${course.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/admin/courses/${course.id}?edit=true`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/admin/courses/${course.id}/students`}>
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(course.id, course.name)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useDataTable({
    data: filteredCourses,
    columns,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Courses</CardTitle>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={8} columns={7} />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <ErrorState
            title="Failed to Load Courses"
            message="Unable to fetch courses list. Please try again."
            action={{
              label: "Retry",
              onClick: () => window.location.reload(),
            }}
            variant="destructive"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <CardTitle>Courses ({courses?.length || 0})</CardTitle>
          </div>
          <Button asChild>
            <Link href="/dashboard/admin/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses by name, code, department, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Table */}
          {filteredCourses.length === 0 ? (
            <EmptyState
              title="No courses found"
              message={
                searchTerm
                  ? "No courses match your search criteria. Try adjusting your search term."
                  : "Get started by adding your first course to the system."
              }
              action={
                !searchTerm
                  ? {
                      label: "Add Course",
                      href: "/dashboard/admin/courses/new",
                    }
                  : undefined
              }
              icon={<BookOpen className="h-12 w-12" />}
            />
          ) : (
            <DataTable table={table} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
