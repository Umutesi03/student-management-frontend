import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { coursesApi } from "@/shared/utils/api"
import { useAuthStore } from "@/lib/auth"
import type { Course, CourseFormData, CourseUpdateData, CourseAssignment } from "@/shared/types"

// Get all courses
export function useCourses() {
  const { token } = useAuthStore()
  
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.getAll(token)
      return response.data
    },
    enabled: !!token,
  })
}

// Get single course by ID
export function useCourse(id: string) {
  const { token } = useAuthStore()
  
  return useQuery({
    queryKey: ["courses", id],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.getById(id, token)
      return response.data
    },
    enabled: !!token && !!id,
  })
}

// Get students enrolled in a course
export function useCourseStudents(courseId: string) {
  const { token } = useAuthStore()
  
  return useQuery({
    queryKey: ["courses", courseId, "students"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.getStudents(courseId, token)
      return response.data
    },
    enabled: !!token && !!courseId,
  })
}

// Get courses for a specific student
export function useStudentCourses(studentId: string) {
  const { token } = useAuthStore()
  
  return useQuery({
    queryKey: ["students", studentId, "courses"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.getByStudent(studentId, token)
      return response.data
    },
    enabled: !!token && !!studentId,
  })
}

// Create course mutation
export function useCreateCourse() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CourseFormData) => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.create(data, token)
      return response.data
    },
    onSuccess: (newCourse) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      toast.success("Course created successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to create course"
      toast.error(message)
    },
  })
}

// Update course mutation
export function useUpdateCourse() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CourseUpdateData }) => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.update(id, data, token)
      return response.data
    },
    onSuccess: (updatedCourse) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      queryClient.invalidateQueries({ queryKey: ["courses", updatedCourse.id] })
      toast.success("Course updated successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to update course"
      toast.error(message)
    },
  })
}

// Delete course mutation
export function useDeleteCourse() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.delete(id, token)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      toast.success("Course deleted successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to delete course"
      toast.error(message)
    },
  })
}

// Assign course to student mutation
export function useAssignCourse() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (assignment: CourseAssignment) => {
      if (!token) throw new Error("No authentication token")
      const response = await coursesApi.assign(assignment, token)
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      queryClient.invalidateQueries({ queryKey: ["courses", variables.courseId, "students"] })
      queryClient.invalidateQueries({ queryKey: ["students", variables.studentId, "courses"] })
      toast.success("Course assigned successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to assign course"
      toast.error(message)
    },
  })
}
