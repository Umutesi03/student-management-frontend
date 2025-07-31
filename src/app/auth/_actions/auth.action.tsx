// This connects to the real backend API for signup and OTP verification

export type SignupPayload = {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword?: string
}

export async function signup(payload: SignupPayload): Promise<void> {
  console.log("Attempting signup with payload:", payload)

  const response = await fetch("https://student-management-backend-0ef8.onrender.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
    }),
  })

  if (!response.ok) {
    let errorData: any
    try {
      errorData = await response.json()
    } catch (e) {
      errorData = await response.text()
    }
    console.error("Signup API error response:", errorData)

    let errorMessage = "Failed to register"
    if (typeof errorData === "object" && errorData !== null) {
      if (errorData.message) {
        errorMessage = errorData.message
      } else if (errorData.error) {
        errorMessage = errorData.error
      } else if (typeof errorData.errors === "object" && errorData.errors !== null) {
        const firstErrorKey = Object.keys(errorData.errors)[0]
        if (firstErrorKey && errorData.errors[firstErrorKey].message) {
          errorMessage = errorData.errors[firstErrorKey].message
        } else {
          errorMessage = JSON.stringify(errorData.errors)
        }
      } else {
        errorMessage = JSON.stringify(errorData)
      }
    } else if (typeof errorData === "string") {
      errorMessage = errorData
    }

    throw new Error(errorMessage)
  }

  return
}

export async function verifyOTP(email: string, otp: string): Promise<void> {
  const response = await fetch("https://student-management-backend-0ef8.onrender.com/api/otp/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "OTP verification failed" }))
    throw new Error(errorData.message || "OTP verification failed")
  }

  return
}
