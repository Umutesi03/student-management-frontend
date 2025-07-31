const API_BASE_URL = "https://student-management-backend-0ef8.onrender.com/api"

// Auth API
export const authApi = {
  register: async (data: {
    fullName: string
    email: string
    phone: string
    password: string
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Registration failed" }))
      throw new Error(errorData.message || "Registration failed")
    }
    return response.json()
  },

  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Login failed" }))
      throw new Error(errorData.message || "Login failed")
    }
    return response.json()
  },
}

// OTP API
export const otpApi = {
  verify: async (data: { email: string; otp: string }) => {
    const response = await fetch(`${API_BASE_URL}/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "OTP verification failed" }))
      throw new Error(errorData.message || "OTP verification failed")
    }
    return response.json()
  },
}

// Admin API (requires admin role)
export const adminApi = {
  // Student management
  getStudents: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch students" }))
      throw new Error(errorData.message || "Failed to fetch students")
    }
    return response.json()
  },

  getStudent: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch student" }))
      throw new Error(errorData.message || "Failed to fetch student")
    }
    return response.json()
  },

  /**
   * Update a student record
   * @param id Student ID
   * @param data Student update payload
   * @param token Auth token
   */
  updateStudent: async (id: string, data: unknown, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to update student" }))
      throw new Error(errorData.message || "Failed to update student")
    }
    return response.json()
  },

  deleteStudent: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to delete student" }))
      throw new Error(errorData.message || "Failed to delete student")
    }
    return response.json()
  },

  promoteStudent: async (id: string, role: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/students/${id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to update student role" }))
      throw new Error(errorData.message || "Failed to update student role")
    }
    return response.json()
  },
}

// Courses API (admin endpoints)
export const coursesApi = {
  getAllCourses: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch courses" }))
      throw new Error(errorData.message || "Failed to fetch courses")
    }
    return response.json()
  },

  getCourse: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch course" }))
      throw new Error(errorData.message || "Failed to fetch course")
    }
    return response.json()
  },

  createCourse: async (
    data: {
      name: string
      code: string
      credits: number
      description?: string
      department?: string
      instructor?: string
    },
    token: string,
  ) => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to create course" }))
      throw new Error(errorData.message || "Failed to create course")
    }
    return response.json()
  },

  /**
   * Update a course record
   * @param id Course ID
   * @param data Course update payload
   * @param token Auth token
   */
  updateCourse: async (id: string, data: unknown, token: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to update course" }))
      throw new Error(errorData.message || "Failed to update course")
    }
    return response.json()
  },

  deleteCourse: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to delete course" }))
      throw new Error(errorData.message || "Failed to delete course")
    }
    return response.json()
  },

  assignCourse: async (data: { studentId: string; courseId: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to assign course" }))
      throw new Error(errorData.message || "Failed to assign course")
    }
    return response.json()
  },

  getCourseStudents: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch course students" }))
      throw new Error(errorData.message || "Failed to fetch course students")
    }
    return response.json()
  },

  getStudentCourses: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/student/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch student courses" }))
      throw new Error(errorData.message || "Failed to fetch student courses")
    }
    return response.json()
  },
}

// Student Profile API (student endpoints)
export const studentApi = {
  getProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/student/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch profile" }))
      throw new Error(errorData.message || "Failed to fetch profile")
    }
    return response.json()
  },

  /**
   * Update a user profile
   * @param data Profile update payload
   * @param token Auth token
   */
  updateProfile: async (data: unknown, token: string) => {
    const response = await fetch(`${API_BASE_URL}/student/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to update profile" }))
      throw new Error(errorData.message || "Failed to update profile")
    }
    return response.json()
  },
}
