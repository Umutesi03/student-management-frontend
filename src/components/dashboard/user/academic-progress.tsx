import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Progress } from "../../ui/progress"

export function AcademicProgress() {
  const courses = [
    { name: "Mathematics", progress: 85, grade: "A" },
    { name: "Physics", progress: 72, grade: "B+" },
    { name: "Chemistry", progress: 90, grade: "A+" },
    { name: "Biology", progress: 68, grade: "B" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{course.name}</span>
                <span className="text-sm font-semibold text-primary">{course.grade}</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <div className="text-xs text-muted-foreground text-right">{course.progress}% Complete</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
