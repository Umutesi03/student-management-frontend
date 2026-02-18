"use client";

import {
  useStudent,
  useUpdateStudent,
  useDeleteStudent,
  usePromoteStudent,
} from "@/features/students/hooks/use-students";
import { LoadingState, PageLoading } from "@/shared/components/loading";
import { ErrorState, NotFoundState } from "@/shared/components/error-states";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Edit,
  Save,
  X,
  Trash2,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import type { StudentUpdateData } from "@/shared/types";

interface StudentDetailProps {
  studentId: string;
}

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data: student, isLoading, error } = useStudent(studentId);
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();
  const promoteMutation = usePromoteStudent();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<StudentUpdateData>({});

  if (isLoading) {
    return (
      <PageLoading
        title="Loading Student"
        subtitle="Fetching student details..."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Student"
        message="Unable to fetch student details. Please try again."
        action={{
          label: "Retry",
          onClick: () => window.location.reload(),
        }}
        variant="destructive"
      />
    );
  }

  if (!student) {
    return (
      <NotFoundState
        title="Student Not Found"
        message="The student you're looking for doesn't exist or has been removed."
        backHref="/dashboard/admin/students"
        backLabel="Back to Students"
      />
    );
  }

  const handleEdit = () => {
    setEditData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      address: student.address,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ id: studentId, data: editData });
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
        "Are you sure you want to delete this student? This action cannot be undone."
      )
    ) {
      try {
        await deleteMutation.mutateAsync(studentId);
        // Redirect will be handled by the parent component
      } catch (error) {
        // Error is handled by the mutation hook
      }
    }
  };

  const handlePromote = async (newRole: string) => {
    if (
      window.confirm(
        `Are you sure you want to change this student's role to ${newRole}?`
      )
    ) {
      try {
        await promoteMutation.mutateAsync({ id: studentId, role: newRole });
      } catch (error) {
        // Error is handled by the mutation hook
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Student Details
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              View and manage student information
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

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={editData.fullName || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, fullName: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{student.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm">{student.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editData.phone || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm">{student.phone || "Not provided"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editData.address || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, address: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm">
                      {student.address || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Student ID</span>
                <Badge variant="outline">{student.id}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Role</span>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={student.role === "admin" ? "default" : "secondary"}
                  >
                    {student.role}
                  </Badge>
                  {student.role === "student" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePromote("admin")}
                      disabled={promoteMutation.isPending}
                    >
                      Promote to Admin
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verification Status</span>
                <Badge variant={student.isVerified ? "default" : "destructive"}>
                  {student.isVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">Created</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {format(new Date(student.createdAt), "PPP")}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">Last Updated</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {format(new Date(student.updatedAt), "PPP")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
