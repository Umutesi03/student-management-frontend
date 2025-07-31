"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "../../../lib/auth"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "admin" | "user"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    // Check if user has correct role
    if (userType === "admin" && user?.role !== "admin") {
      router.push("/dashboard/user")
      return
    }

    if (userType === "user" && user?.role !== "student") {
      router.push("/dashboard/admin")
      return
    }
  }, [isAuthenticated, user, userType, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardSidebar userType={userType} />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-6 bg-slate-900 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}
