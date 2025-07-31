"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../../lib/utils"
import { Button } from "../../ui/button"
import { useAuthStore } from "../../../lib/auth"
import { LayoutDashboard, Users, BookOpen, Settings, User, BarChart3, Calendar, FileText, LogOut } from "lucide-react"

interface DashboardSidebarProps {
  userType: "admin" | "user"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { logout, user } = useAuthStore()

  const adminNavItems = [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/students", label: "Students", icon: Users },
    { href: "/dashboard/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/admin/reports", label: "Reports", icon: FileText },
    { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ]

  const userNavItems = [
    { href: "/dashboard/user", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/user/courses", label: "My Courses", icon: BookOpen },
    { href: "/dashboard/user/schedule", label: "Schedule", icon: Calendar },
    { href: "/dashboard/user/grades", label: "Grades", icon: BarChart3 },
    { href: "/dashboard/user/profile", label: "Profile", icon: User },
  ]

  const navItems = userType === "admin" ? adminNavItems : userNavItems

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 px-6 py-6">
          <span className="text-2xl font-bold text-emerald-400">StudentM</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-11 text-slate-300 hover:text-white hover:bg-slate-800",
                  pathname === item.href &&
                    "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-400",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">{user?.fullName?.charAt(0) || "U"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
