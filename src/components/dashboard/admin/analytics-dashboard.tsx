"use client"

import { DashboardLayout } from "../layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { BarChart, LineChart, PieChart, Users, BookOpen, TrendingUp, GraduationCap } from "lucide-react"

export function AnalyticsDashboard() {
  // Dummy data for demonstration
  const studentDemographics = [
    { category: "Undergraduate", count: 2000, percentage: "70%" },
    { category: "Postgraduate", count: 500, percentage: "17.5%" },
    { category: "PhD", count: 347, percentage: "12.5%" },
  ]

  const enrollmentTrends = [
    { year: "2021", newStudents: 800, totalStudents: 2000 },
    { year: "2022", newStudents: 950, totalStudents: 2500 },
    { year: "2023", newStudents: 1000, totalStudents: 2847 },
  ]

  const coursePerformance = [
    { course: "Calculus I", avgGrade: "B+", enrollment: 300 },
    { course: "Linear Algebra", avgGrade: "A-", enrollment: 250 },
    { course: "Discrete Math", avgGrade: "B", enrollment: 280 },
    { course: "Data Structures", avgGrade: "A", enrollment: 320 },
  ]

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Overview</h1>
          <p className="text-muted-foreground">Gain insights into your institution&apos;s data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student Demographics */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Student Demographics</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">2,847 Total Students</p>
              <div className="h-48 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                <PieChart className="h-12 w-12 text-muted-foreground/50" />
                <span className="text-muted-foreground/50 ml-2">Pie Chart Placeholder</span>
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentDemographics.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.category}</TableCell>
                      <TableCell>{data.count}</TableCell>
                      <TableCell>{data.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Enrollment Trends */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Enrollment Trends</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Yearly Enrollment Growth</p>
              <div className="h-48 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                <LineChart className="h-12 w-12 text-muted-foreground/50" />
                <span className="text-muted-foreground/50 ml-2">Line Chart Placeholder</span>
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>New Students</TableHead>
                    <TableHead>Total Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollmentTrends.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.year}</TableCell>
                      <TableCell>{data.newStudents}</TableCell>
                      <TableCell>{data.totalStudents}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Course Performance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Course Performance</CardTitle>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Top Performing Courses</p>
              <div className="h-48 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                <BarChart className="h-12 w-12 text-muted-foreground/50" />
                <span className="text-muted-foreground/50 ml-2">Bar Chart Placeholder</span>
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Avg. Grade</TableHead>
                    <TableHead>Enrollment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coursePerformance.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.course}</TableCell>
                      <TableCell>{data.avgGrade}</TableCell>
                      <TableCell>{data.enrollment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics Section */}
        <Card>
          <CardHeader>
            <CardTitle>Graduation Rate Over Time</CardTitle>
            <CardDescription>Track the percentage of students graduating each year.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
              <GraduationCap className="h-16 w-16 text-muted-foreground/50" />
              <span className="text-muted-foreground/50 ml-2">Larger Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
