"use client"

import { DashboardLayout } from "../../components/dashboard/layout/dashboard-layout"
import { useAuthStore } from "../../lib/auth"
import { useEffect } from "react"
import { redirect } from "next/navigation"

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/auth/login")
    }
  }, [isAuthenticated])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <DashboardLayout userType={user.role === "admin" ? "admin" : "user"}>
      {children}
    </DashboardLayout>
  )
}
