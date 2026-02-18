// User and Auth Types
export interface User {
  id: string
  fullName: string
  email: string
  phone?: string
  address?: string
  role: "admin" | "student"
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
  message: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  phone: string
  password: string
}

export interface OTPVerification {
  email: string
  otp: string
}

// Student Types
export interface Student {
  id: string
  fullName: string
  email: string
  phone?: string
  address?: string
  role: string
  isVerified: boolean
  enrolledCourses?: Course[]
  createdAt: string
  updatedAt: string
}

export interface StudentFormData {
  fullName: string
  email: string
  phone?: string
  address?: string
}

export interface StudentUpdateData extends Partial<StudentFormData> {
  role?: string
}

// Course Types
export interface Course {
  id: string
  name: string
  code: string
  credits: number
  description?: string
  department?: string
  instructor?: string
  enrolledStudents?: Student[]
  createdAt: string
  updatedAt: string
}

export interface CourseFormData {
  name: string
  code: string
  credits: number
  description?: string
  department?: string
  instructor?: string
}

export interface CourseUpdateData extends Partial<CourseFormData> {}

export interface CourseAssignment {
  studentId: string
  courseId: string
}

// Dashboard Types
export interface DashboardStats {
  totalStudents: number
  totalCourses: number
  activeEnrollments: number
  averageGrade?: number
}

export interface Activity {
  id: string
  type: "enrollment" | "course_created" | "student_updated" | "grade_updated"
  description: string
  user: string
  timestamp: string
}

// Table and UI Types
export interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
}

export interface ApiError {
  message: string
  code?: string
  details?: any
}

// Route Parameter Types
export interface StudentPageParams {
  id: string
}

export interface CoursePageParams {
  id: string
}

// Form State Types
export interface FormState<T> {
  data: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isValid: boolean
}

// Navigation Types
export interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
}

// Theme and Settings
export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

// Analytics Types
export interface AnalyticsData {
  studentsOverTime: Array<{ date: string; count: number }>
  coursesPopularity: Array<{ name: string; enrollments: number }>
  departmentStats: Array<{ department: string; students: number; courses: number }>
  recentActivity: Activity[]
}

// Search and Filter Types
export interface SearchFilters {
  query: string
  department?: string
  role?: string
  status?: "active" | "inactive"
  dateRange?: {
    from: Date
    to: Date
  }
}

export interface SortConfig {
  key: string
  direction: "asc" | "desc"
}
