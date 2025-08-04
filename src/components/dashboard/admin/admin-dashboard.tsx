"use client";

import { DashboardLayout } from "../layout/dashboard-layout";
import { StatsCards } from "../shared/stats-cards";
import { RecentActivity } from "../shared/recent-activity";
import { QuickActions } from "./quick-actions";
import { StudentsOverview } from "./students-overview";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+3%",
      trend: "up" as const,
      icon: BookOpen,
    },
    {
      title: "Graduates This Year",
      value: "423",
      change: "+18%",
      trend: "up" as const,
      icon: GraduationCap,
    },
    {
      title: "Enrollment Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up" as const,
      icon: TrendingUp,
    },
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here is whatis happening at your institution.
          </p>
        </div>

        <StatsCards stats={stats} />
        {/* Apply the same card, table, and color scheme as students-management.tsx */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StudentsOverview />
            <RecentActivity activities={[]} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
