import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";

type Activity = {
  id: number;
  type: string;
  description: string;
  createdAt: string;
  courseId: number | null;
  userId: number;
  courseName: string | null;
  userFullName: string;
};

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function RecentActivity({ activities }: { activities: Activity[] }) {
  const getActivityColor = (type: string) => {
    switch (type) {
      case "course_enrollment":
        return "default";
      case "profile_update":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.userFullName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getActivityColor(activity.type)}>
                  {activity.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatTime(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
