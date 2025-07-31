import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "../../../lib/utils"

interface StatCard {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ComponentType<{ className?: string }>
}

interface StatsCardsProps {
  stats: StatCard[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="flex items-center text-xs">
              {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
              {stat.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500 mr-1" />}
              {stat.trend === "neutral" && <Minus className="h-3 w-3 text-muted-foreground mr-1" />}
              <span
                className={cn(
                  stat.trend === "up" && "text-green-600",
                  stat.trend === "down" && "text-red-600",
                  stat.trend === "neutral" && "text-muted-foreground",
                )}
              >
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
