"use client";

import { DashboardLayout } from "../layout/dashboard-layout";
import { StatsCards } from "../shared/stats-cards";
import { RecentActivity } from "../shared/recent-activity";
import { AcademicProgress } from "./academic-progress";
import { MyCoursesTable } from "./my-courses-table";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../lib/auth";
import { api } from "../../../lib/axios";
import { BookOpen, Calendar, Award, Clock } from "lucide-react";

export function UserDashboard() {
  const token = useAuthStore((state) => state.token);

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery({
    queryKey: ["student-courses", token],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/student/me/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const {
    data: activities,
    isLoading: activitiesLoading,
    isError: activitiesError,
  } = useQuery({
    queryKey: ["student-activities", token],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/student/me/activities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const stats = [
    {
      title: "Enrolled Courses",
      value: courses ? courses.length : "-",
      change: courses ? `+${courses.length}` : "-",
      trend: "up" as const,
      icon: BookOpen,
    },
    {
      title: "Upcoming Exams",
      value: "3",
      change: "This week",
      trend: "neutral" as const,
      icon: Calendar,
    },
    {
      title: "GPA",
      value: "3.8",
      change: "+0.2",
      trend: "up" as const,
      icon: Award,
    },
    {
      title: "Study Hours",
      value: "24h",
      change: "This week",
      trend: "neutral" as const,
      icon: Clock,
    },
  ];

  if (coursesLoading || activitiesLoading) {
    return (
      <DashboardLayout userType="user">
        <div className="flex items-center justify-center h-64">Loading...</div>
      </DashboardLayout>
    );
  }

  if (coursesError || activitiesError) {
    return (
      <DashboardLayout userType="user">
        <div className="flex items-center justify-center h-64 text-red-500">
          Error loading data.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Track your academic progress and stay updated with your courses.
          </p>
        </div>

        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AcademicProgress courses={courses || []} />
            <MyCoursesTable courses={courses || []} />
            {activities && <RecentActivity activities={activities} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
