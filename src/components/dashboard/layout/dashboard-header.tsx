"use client"

import { Bell, Menu, Search } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Avatar, AvatarFallback } from "../../ui/avatar"
import { DarkModeToggle } from "./dark-mode-toggle"
import type { User } from "../../../shared/types"

interface DashboardHeaderProps {
  user?: User | null
  onMenuClick?: () => void
}

export function DashboardHeader({ user, onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <DarkModeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User avatar */}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.fullName || "User"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role || "user"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
