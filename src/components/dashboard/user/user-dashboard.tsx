"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import { coursesApi, profileApi } from "@/shared/utils/api"
import { useAuthStore } from "@/lib/auth"
import { LoadingState } from "@/shared/components/loading"
import { ErrorState } from "@/shared/components/error-states"
import { 
  BookOpen, 
  BarChart3, 
  Calendar,
  User,
  GraduationCap,
  Clock,
  Award,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

export function UserDashboard() {
  const { token, user } = useAuthStore()

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await profileApi.get(token)
      return response.data
    },
    enabled: !!token,
  })

  const { data: myCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      if (!token || !user?.id) throw new Error("No authentication token or user ID")
      const response = await coursesApi.getByStudent(user.id, token)
      return response.data
    },
    enabled: !!token && !!user?.id,
  })

  const isLoading = profileLoading || coursesLoading

  if (isLoading) {
    return <LoadingState message="Loading your dashboard..." />
  }

  const totalCourses = myCourses?.length || 0
  const completedCourses = Math.floor(totalCourses * 0.6) // Mock completion rate
  const totalCredits = myCourses?.reduce((acc, course) => acc + course.credits, 0) || 0
  const gpa = 3.7 // Mock GPA

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Here's an overview of your academic progress
            </p>
          </div>
          
          <Button asChild>
            <Link href="/dashboard/user/profile">
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Active enrollments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCredits}</div>
              <p className="text-xs text-muted-foreground">
                Credit hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gpa.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                Out of 4.0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((completedCourses / totalCourses) * 100) || 0}%</div>
              <p className="text-xs text-muted-foreground">
                Completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress and Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Academic Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Completion</span>
                  <span>{completedCourses}/{totalCourses}</span>
                </div>
                <Progress value={(completedCourses / totalCourses) * 100} className="w-full" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Credit Hours</span>
                  <span>{totalCredits}/120</span>
                </div>
                <Progress value={(totalCredits / 120) * 100} className="w-full" />
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Recent Achievement</span>
                  <Badge>Dean's List</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Congratulations on maintaining excellent grades!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button asChild className="justify-start h-auto p-4">
                  <Link href="/dashboard/user/courses">
                    <BookOpen className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">View My Courses</div>
                      <div className="text-sm text-muted-foreground">
                        Access course materials and assignments
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start h-auto p-4">
                  <Link href="/dashboard/user/schedule">
                    <Calendar className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Class Schedule</div>
                      <div className="text-sm text-muted-foreground">
                        View upcoming classes and events
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start h-auto p-4">
                  <Link href="/dashboard/user/grades">
                    <BarChart3 className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Check Grades</div>
                      <div className="text-sm text-muted-foreground">
                        View your academic performance
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Current Courses</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/user/courses">
                View All Courses
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myCourses && myCourses.length > 0 ? (
                myCourses.slice(0, 4).map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.code} • {course.credits} credits
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{course.instructor || "TBA"}</Badge>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/dashboard/user/courses/${course.id}`}>
                          <Clock className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No courses enrolled yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
