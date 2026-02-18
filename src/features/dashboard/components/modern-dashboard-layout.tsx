"use client";

import { DashboardSidebar } from "@/components/dashboard/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/layout/dashboard-header";
import { useAuthStore } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ModernDashboardLayoutProps {
  children: React.ReactNode;
  userType: "admin" | "user";
}

export function ModernDashboardLayout({
  children,
  userType,
}: ModernDashboardLayoutProps) {
  const { user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar userType={userType} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <DashboardHeader
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
