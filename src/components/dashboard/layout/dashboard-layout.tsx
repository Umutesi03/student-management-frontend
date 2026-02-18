"use client"

import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { useAuthStore } from "../../../lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "admin" | "user"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar userType={userType} />
      
      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}
        <DashboardHeader user={user} />
        
        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
