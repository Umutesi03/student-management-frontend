import type { 
  ApiResponse, 
  ApiError, 
  User, 
  Student, 
  Course, 
  LoginCredentials, 
  RegisterData, 
  OTPVerification,
  StudentFormData,
  StudentUpdateData,
  CourseFormData,
  CourseUpdateData,
  CourseAssignment
} from '../types'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://student-management-backend-0ef8.onrender.com/api"

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      
      throw new ApiError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    }
  }

  private getAuthHeaders(token: string) {
    return {
      'Authorization': `Bearer ${token}`
    }
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ message: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async verifyOTP(otpData: OTPVerification): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/otp/verify', {
      method: 'POST',
      body: JSON.stringify(otpData),
    })
  }

  // Student endpoints
  async getStudents(token: string): Promise<ApiResponse<Student[]>> {
    return this.request('/admin/students', {
      headers: this.getAuthHeaders(token),
    })
  }

  async getStudent(id: string, token: string): Promise<ApiResponse<Student>> {
    return this.request(`/admin/students/${id}`, {
      headers: this.getAuthHeaders(token),
    })
  }

  async createStudent(studentData: StudentFormData, token: string): Promise<ApiResponse<Student>> {
    return this.request('/admin/students', {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(studentData),
    })
  }

  async updateStudent(id: string, studentData: StudentUpdateData, token: string): Promise<ApiResponse<Student>> {
    return this.request(`/admin/students/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(studentData),
    })
  }

  async deleteStudent(id: string, token: string): Promise<ApiResponse<{ message: string }>> {
    return this.request(`/admin/students/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
    })
  }

  async promoteStudent(id: string, role: string, token: string): Promise<ApiResponse<Student>> {
    return this.request(`/admin/students/${id}/role`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ role }),
    })
  }

  // Course endpoints
  async getCourses(token: string): Promise<ApiResponse<Course[]>> {
    return this.request('/courses', {
      headers: this.getAuthHeaders(token),
    })
  }

  async getCourse(id: string, token: string): Promise<ApiResponse<Course>> {
    return this.request(`/courses/${id}`, {
      headers: this.getAuthHeaders(token),
    })
  }

  async createCourse(courseData: CourseFormData, token: string): Promise<ApiResponse<Course>> {
    return this.request('/courses', {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(courseData),
    })
  }

  async updateCourse(id: string, courseData: CourseUpdateData, token: string): Promise<ApiResponse<Course>> {
    return this.request(`/courses/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(courseData),
    })
  }

  async deleteCourse(id: string, token: string): Promise<ApiResponse<{ message: string }>> {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
    })
  }

  async assignCourse(assignment: CourseAssignment, token: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/courses/assign', {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(assignment),
    })
  }

  async getCourseStudents(id: string, token: string): Promise<ApiResponse<Student[]>> {
    return this.request(`/courses/${id}/students`, {
      headers: this.getAuthHeaders(token),
    })
  }

  async getStudentCourses(id: string, token: string): Promise<ApiResponse<Course[]>> {
    return this.request(`/courses/student/${id}`, {
      headers: this.getAuthHeaders(token),
    })
  }

  // Student profile endpoints
  async getProfile(token: string): Promise<ApiResponse<User>> {
    return this.request('/student/me', {
      headers: this.getAuthHeaders(token),
    })
  }

  async updateProfile(profileData: Partial<User>, token: string): Promise<ApiResponse<User>> {
    return this.request('/student/me', {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(profileData),
    })
  }
}

class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL)

// Export individual API modules for backward compatibility and organization
export const authApi = {
  login: (credentials: LoginCredentials) => apiClient.login(credentials),
  register: (userData: RegisterData) => apiClient.register(userData),
}

export const otpApi = {
  verify: (otpData: OTPVerification) => apiClient.verifyOTP(otpData),
}

export const studentsApi = {
  getAll: (token: string) => apiClient.getStudents(token),
  getById: (id: string, token: string) => apiClient.getStudent(id, token),
  create: (data: StudentFormData, token: string) => apiClient.createStudent(data, token),
  update: (id: string, data: StudentUpdateData, token: string) => apiClient.updateStudent(id, data, token),
  delete: (id: string, token: string) => apiClient.deleteStudent(id, token),
  promote: (id: string, role: string, token: string) => apiClient.promoteStudent(id, role, token),
}

export const coursesApi = {
  getAll: (token: string) => apiClient.getCourses(token),
  getById: (id: string, token: string) => apiClient.getCourse(id, token),
  create: (data: CourseFormData, token: string) => apiClient.createCourse(data, token),
  update: (id: string, data: CourseUpdateData, token: string) => apiClient.updateCourse(id, data, token),
  delete: (id: string, token: string) => apiClient.deleteCourse(id, token),
  assign: (assignment: CourseAssignment, token: string) => apiClient.assignCourse(assignment, token),
  getStudents: (id: string, token: string) => apiClient.getCourseStudents(id, token),
  getByStudent: (id: string, token: string) => apiClient.getStudentCourses(id, token),
}

export const profileApi = {
  get: (token: string) => apiClient.getProfile(token),
  update: (data: Partial<User>, token: string) => apiClient.updateProfile(data, token),
}

export { ApiError }
