"use client"

import { useQuery } from "@tanstack/react-query"
import { DashboardLayout } from "../layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { BookOpen, CalendarDays } from "lucide-react"
import { coursesApi } from "../../../lib/api"
import { useAuthStore } from "../../../lib/auth"
import { toast } from "sonner"

export function MyCourses() {
  const { token, user } = useAuthStore()

  const {
    data: studentCourses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentCourses", user?.id],
    queryFn: () => coursesApi.getStudentCourses(user!.id, token!),
    enabled: !!token && !!user?.id,
  })

  if (error) {
    toast.error(`Error loading your courses: ${error.message}`)
  }

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">View the courses you are currently enrolled in.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
            <CardDescription>A list of all courses you are taking.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : studentCourses && studentCourses.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Instructor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentCourses.map((course: any) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.department || "N/A"}</TableCell>
                        <TableCell>{course.instructor || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>You are not currently enrolled in any courses.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Placeholder for upcoming assignments/exams */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Important dates for your enrolled courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No upcoming deadlines found.</p>
              <p className="text-sm">This section can be populated with data from your course API.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
