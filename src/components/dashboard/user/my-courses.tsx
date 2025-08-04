"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "../layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
// ...existing code...
import { MyCoursesTable } from "./my-courses-table";
import { BookOpen, CalendarDays } from "lucide-react";
import { api } from "../../../lib/axios";
import { useAuthStore } from "../../../lib/auth";
import { toast } from "sonner";

export function MyCourses() {
  const { token, user } = useAuthStore();

  const {
    data: studentCourses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentCourses", token],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/student/me/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  if (error) {
    toast.error(`Error loading your courses: ${error.message}`);
  }

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">
            View the courses you are currently enrolled in.
          </p>
        </div>

        <Card>
  
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : studentCourses && studentCourses.length > 0 ? (
              <MyCoursesTable courses={studentCourses} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>You are not currently enrolled in any courses.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Placeholder for upcoming assignments/exams */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Important dates for your enrolled courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No upcoming deadlines found.</p>
              <p className="text-sm">
                This section can be populated with data from your course API.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
