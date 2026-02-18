"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { studentsApi, coursesApi } from "@/shared/utils/api"
import { useAuthStore } from "@/lib/auth"
import { LoadingState } from "@/shared/components/loading"
import { ErrorState } from "@/shared/components/error-states"
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  TrendingUp,
  Plus,
  Eye,
  UserPlus,
  BookPlus
} from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const { token } = useAuthStore()

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await studentsApi.getAll(token)
      return response.data
    },
    enabled: !!token,
  })

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.getAll(token)
      return response.data
    },
    enabled: !!token,
  })

  const isLoading = studentsLoading || coursesLoading

  if (isLoading) {
    return <LoadingState message="Loading dashboard..." />
  }

  const totalStudents = students?.length || 0
  const totalCourses = courses?.length || 0
  const verifiedStudents = students?.filter(s => s.isVerified)?.length || 0
  const recentStudents = students?.slice(-5) || []

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Overview of your student management system
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button asChild>
              <Link href="/dashboard/admin/students/new">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/admin/courses/new">
                <BookPlus className="h-4 w-4 mr-2" />
                Add Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                {verifiedStudents} verified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Active courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courses?.reduce((acc, course) => acc + (course.enrolledStudents?.length || 0), 0) || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Total enrollments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">
                From last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button asChild className="justify-start h-auto p-4">
                  <Link href="/dashboard/admin/students">
                    <Users className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Manage Students</div>
                      <div className="text-sm text-muted-foreground">
                        View, add, or edit student records
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start h-auto p-4">
                  <Link href="/dashboard/admin/courses">
                    <BookOpen className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Manage Courses</div>
                      <div className="text-sm text-muted-foreground">
                        Create and manage course offerings
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start h-auto p-4">
                  <Link href="/dashboard/admin/analytics">
                    <BarChart3 className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">View Analytics</div>
                      <div className="text-sm text-muted-foreground">
                        Track performance and trends
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Students */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Students</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/admin/students">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentStudents.length > 0 ? (
                  recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {student.fullName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{student.fullName}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={student.isVerified ? "default" : "secondary"} className="text-xs">
                          {student.isVerified ? "Verified" : "Pending"}
                        </Badge>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/dashboard/admin/students/${student.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent students</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
