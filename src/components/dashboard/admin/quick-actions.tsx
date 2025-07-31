import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { FileText, Settings } from "lucide-react"
import { AddStudentDialog } from "./add-student-dialog"
import { AddCourseDialog } from "./add-course-dialog"
import { AssignCourseDialog } from "./assign-course-dialog"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <AddStudentDialog />
        <AddCourseDialog />
        <AssignCourseDialog />
        <Button variant="ghost" className="w-full justify-start gap-3">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          System Settings
        </Button>
      </CardContent>
    </Card>
  )
}
