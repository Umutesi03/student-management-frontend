"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useStudents, useDeleteStudent } from "@/features/students/hooks/use-students"
import { LoadingState, TableSkeleton } from "@/shared/components/loading"
import { ErrorState, EmptyState } from "@/shared/components/error-states"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table/data-table"
import { useDataTable } from "@/hooks/use-data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { 
  Search, 
  Eye, 
  Trash2, 
  Plus, 
  Users,
  MoreHorizontal,
  Edit
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Student } from "@/shared/types"

export function StudentsTable() {
  const { data: students, isLoading, error } = useStudents()
  const deleteMutation = useDeleteStudent()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = useMemo(() => {
    if (!students) return []
    
    return students.filter((student: Student) => 
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [students, searchTerm])

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        await deleteMutation.mutateAsync(id)
      } catch (error) {
        // Error is handled by the mutation hook
      }
    }
  }

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "id",
      header: "Student ID",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono text-xs">
          {row.getValue("id")}
        </Badge>
      ),
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("fullName")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-300">
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return (
          <Badge variant={role === "admin" ? "default" : "secondary"}>
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "isVerified",
      header: "Status",
      cell: ({ row }) => {
        const isVerified = row.getValue("isVerified") as boolean
        return (
          <Badge variant={isVerified ? "default" : "destructive"}>
            {isVerified ? "Verified" : "Unverified"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const student = row.original
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/admin/students/${student.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/admin/students/${student.id}?edit=true`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Student
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDelete(student.id, student.fullName)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useDataTable({
    data: filteredStudents,
    columns,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Students</CardTitle>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={8} columns={6} />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <ErrorState
            title="Failed to Load Students"
            message="Unable to fetch students list. Please try again."
            action={{
              label: "Retry",
              onClick: () => window.location.reload()
            }}
            variant="destructive"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <CardTitle>Students ({students?.length || 0})</CardTitle>
          </div>
          <Button asChild>
            <Link href="/dashboard/admin/students/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Table */}
          {filteredStudents.length === 0 ? (
            <EmptyState
              title="No students found"
              message={
                searchTerm 
                  ? "No students match your search criteria. Try adjusting your search term."
                  : "Get started by adding your first student to the system."
              }
              action={
                !searchTerm ? {
                  label: "Add Student",
                  href: "/dashboard/admin/students/new"
                } : undefined
              }
              icon={<Users className="h-12 w-12" />}
            />
          ) : (
            <DataTable table={table} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
