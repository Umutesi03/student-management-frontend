"use client"

import { Search, Settings } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Avatar, AvatarFallback } from "../../ui/avatar"
import { useAuthStore } from "../../../lib/auth"
import { DarkModeToggle } from "./dark-mode-toggle"

export function DashboardHeader() {
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DarkModeToggle />

          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800">
            <Settings className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8 bg-emerald-500">
            <AvatarFallback className="bg-emerald-500 text-white text-sm font-semibold">
              {user?.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
