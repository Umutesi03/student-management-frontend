import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { studentsApi } from "@/shared/utils/api"
import { useAuthStore } from "@/lib/auth"
import type { Student, StudentFormData, StudentUpdateData } from "@/shared/types"

// Get all students
export function useStudents() {
  const { token } = useAuthStore()
  
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await studentsApi.getAll(token)
      return response.data
    },
    enabled: !!token,
  })
}

// Get single student by ID
export function useStudent(id: string) {
  const { token } = useAuthStore()
  
  return useQuery({
    queryKey: ["students", id],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await studentsApi.getById(id, token)
      return response.data
    },
    enabled: !!token && !!id,
  })
}

// Create student mutation
export function useCreateStudent() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: StudentFormData) => {
      if (!token) throw new Error("No authentication token")
      const response = await studentsApi.create(data, token)
      return response.data
    },
    onSuccess: (newStudent) => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      toast.success("Student created successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to create student"
      toast.error(message)
    },
  })
}

// Update student mutation
export function useUpdateStudent() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: StudentUpdateData }) => {
      if (!token) throw new Error("No authentication token")
      const response = await studentsApi.update(id, data, token)
      return response.data
    },
    onSuccess: (updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      queryClient.invalidateQueries({ queryKey: ["students", updatedStudent.id] })
      toast.success("Student updated successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to update student"
      toast.error(message)
    },
  })
}

// Delete student mutation
export function useDeleteStudent() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("No authentication token")
      const response = await studentsApi.delete(id, token)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      toast.success("Student deleted successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to delete student"
      toast.error(message)
    },
  })
}

// Promote student mutation
export function usePromoteStudent() {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      if (!token) throw new Error("No authentication token")
      const response = await studentsApi.promote(id, role, token)
      return response.data
    },
    onSuccess: (updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      queryClient.invalidateQueries({ queryKey: ["students", updatedStudent.id] })
      toast.success("Student role updated successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to update student role"
      toast.error(message)
    },
  })
}
