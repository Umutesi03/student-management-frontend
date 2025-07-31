"use client"

import { useTheme } from "next-themes"
import { Switch } from "../../ui/switch"
import { Sun, Moon } from "lucide-react"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-slate-400" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="data-[state=checked]:bg-emerald-500"
      />
      <Moon className="h-4 w-4 text-slate-400" />
    </div>
  )
}
