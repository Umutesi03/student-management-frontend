import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "New student enrolled",
      user: "John Doe",
      time: "2 hours ago",
      type: "enrollment",
    },
    {
      id: 2,
      action: "Course updated",
      user: "Jane Smith",
      time: "4 hours ago",
      type: "course",
    },
    {
      id: 3,
      action: "Grade submitted",
      user: "Mike Johnson",
      time: "6 hours ago",
      type: "grade",
    },
    {
      id: 4,
      action: "Student profile updated",
      user: "Sarah Wilson",
      time: "1 day ago",
      type: "profile",
    },
  ]

  const getActivityColor = (type: string) => {
    switch (type) {
      case "enrollment":
        return "default"
      case "course":
        return "secondary"
      case "grade":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.user}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getActivityColor(activity.type)}>{activity.type}</Badge>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
