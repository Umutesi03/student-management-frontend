"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Input } from "../../ui/input"
import { coursesApi } from "@/shared/utils/api"
import { useAuthStore } from "@/lib/auth"
import { LoadingState, TableSkeleton } from "@/shared/components/loading"
import { ErrorState, EmptyState } from "@/shared/components/error-states"
import { useState, useMemo } from "react"
import Link from "next/link"
import { 
  BookOpen, 
  Search, 
  Eye, 
  Calendar,
  User,
  GraduationCap,
  Clock
} from "lucide-react"
import type { Course } from "@/shared/types"

export function MyCourses() {
  const { token, user } = useAuthStore()
  const [searchTerm, setSearchTerm] = useState("")

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      if (!token || !user?.id) throw new Error("No authentication token or user ID")
      const response = await coursesApi.getByStudent(user.id, token)
      return response.data
    },
    enabled: !!token && !!user?.id,
  })

  const filteredCourses = useMemo(() => {
    if (!courses) return []
    
    return courses.filter((course: Course) => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [courses, searchTerm])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              View and manage your enrolled courses
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
              <TableSkeleton rows={4} columns={4} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              View and manage your enrolled courses
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
              <ErrorState
                title="Failed to Load Courses"
                message="Unable to fetch your enrolled courses. Please try again."
                action={{
                  label: "Retry",
                  onClick: () => window.location.reload()
                }}
                variant="destructive"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const totalCredits = courses?.reduce((acc, course) => acc + course.credits, 0) || 0

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              View and manage your enrolled courses
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Credits</p>
              <p className="text-lg font-semibold">{totalCredits}</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses?.length || 0}</div>
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
              <CardTitle className="text-sm font-medium">Average Load</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courses?.length ? Math.round(totalCredits / courses.length) : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Credits per course
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Courses List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Enrolled Courses</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses by name, code, or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Courses Grid */}
              {filteredCourses.length === 0 ? (
                <EmptyState
                  title={searchTerm ? "No courses found" : "No courses enrolled"}
                  message={
                    searchTerm 
                      ? "No courses match your search criteria. Try adjusting your search term."
                      : "You haven't enrolled in any courses yet. Contact your advisor to register for courses."
                  }
                  icon={<BookOpen className="h-12 w-12" />}
                />
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course: Course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {course.code}
                            </Badge>
                            <CardTitle className="text-lg">{course.name}</CardTitle>
                          </div>
                          <Badge>{course.credits} credits</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {course.department && (
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {course.department}
                              </span>
                            </div>
                          )}
                          {course.instructor && (
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {course.instructor}
                              </span>
                            </div>
                          )}
                        </div>

                        {course.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {course.description}
                          </p>
                        )}

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Active</span>
                          </div>
                          <Button asChild size="sm">
                            <Link href={`/dashboard/user/courses/${course.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
