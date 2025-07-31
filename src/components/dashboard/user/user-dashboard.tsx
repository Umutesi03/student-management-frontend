"use client";

import { DashboardLayout } from "../layout/dashboard-layout";
import { StatsCards } from "../shared/stats-cards";
import { RecentActivity } from "../shared/recent-activity";
import { UserProfile } from "./user-profile";
import { AcademicProgress } from "./academic-progress";
import { BookOpen, Calendar, Award, Clock } from "lucide-react";

export function UserDashboard() {
  const stats = [
    {
      title: "Enrolled Courses",
      value: "6",
      change: "+1",
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
            <AcademicProgress />
            <RecentActivity />
          </div>
          <div>
            <UserProfile />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
