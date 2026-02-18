"use client";

import {
  useCourse,
  useUpdateCourse,
  useDeleteCourse,
  useCourseStudents,
} from "@/features/courses/hooks/use-courses";
import {
  LoadingState,
  PageLoading,
  TableSkeleton,
} from "@/shared/components/loading";
import {
  ErrorState,
  NotFoundState,
  EmptyState,
} from "@/shared/components/error-states";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";
import {
  Edit,
  Save,
  X,
  Trash2,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  User,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import type { CourseUpdateData, Student } from "@/shared/types";

interface CourseDetailProps {
  courseId: string;
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  const { data: course, isLoading, error } = useCourse(courseId);
  const { data: enrolledStudents, isLoading: studentsLoading } =
    useCourseStudents(courseId);
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<CourseUpdateData>({});

  if (isLoading) {
    return (
      <PageLoading
        title="Loading Course"
        subtitle="Fetching course details..."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Course"
        message="Unable to fetch course details. Please try again."
        action={{
          label: "Retry",
          onClick: () => window.location.reload(),
        }}
        variant="destructive"
      />
    );
  }

  if (!course) {
    return (
      <NotFoundState
        title="Course Not Found"
        message="The course you're looking for doesn't exist or has been removed."
        backHref="/dashboard/admin/courses"
        backLabel="Back to Courses"
      />
    );
  }

  const handleEdit = () => {
    setEditData({
      name: course.name,
      code: course.code,
      credits: course.credits,
      description: course.description,
      department: course.department,
      instructor: course.instructor,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ id: courseId, data: editData });
      setIsEditing(false);
      setEditData({});
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone."
      )
    ) {
      try {
        await deleteMutation.mutateAsync(courseId);
        // Redirect will be handled by the parent component
      } catch (error) {
        // Error is handled by the mutation hook
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Course Details
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              View and manage course information
            </p>
          </div>

          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <Button onClick={handleEdit} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Course Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Course Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">{course.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    {isEditing ? (
                      <Input
                        id="code"
                        value={editData.code || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, code: e.target.value })
                        }
                      />
                    ) : (
                      <Badge variant="outline" className="font-mono">
                        {course.code}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    {isEditing ? (
                      <Input
                        id="credits"
                        type="number"
                        value={editData.credits || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            credits: parseInt(e.target.value),
                          })
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">
                        {course.credits} credits
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    {isEditing ? (
                      <Input
                        id="department"
                        value={editData.department || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            department: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="text-sm">
                        {course.department || "Not specified"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    {isEditing ? (
                      <Input
                        id="instructor"
                        value={editData.instructor || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            instructor: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="text-sm">
                        {course.instructor || "Not assigned"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={editData.description || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {course.description || "No description provided"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Stats & Meta */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Course ID</span>
                  <Badge variant="outline">{course.id}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enrolled Students</span>
                  <Badge>{enrolledStudents?.length || 0} students</Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Created</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {format(new Date(course.createdAt), "PPP")}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Last Updated</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {format(new Date(course.updatedAt), "PPP")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enrolled Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Enrolled Students ({enrolledStudents?.length || 0})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {studentsLoading ? (
              <TableSkeleton rows={3} columns={4} />
            ) : !enrolledStudents || enrolledStudents.length === 0 ? (
              <EmptyState
                title="No students enrolled"
                message="This course doesn't have any enrolled students yet."
                action={{
                  label: "Assign Students",
                  href: `/dashboard/admin/courses/${courseId}/assign`,
                }}
                icon={<GraduationCap className="h-12 w-12" />}
              />
            ) : (
              <div className="space-y-2">
                {enrolledStudents.map((student: Student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{student.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {student.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{student.id}</Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/admin/students/${student.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
