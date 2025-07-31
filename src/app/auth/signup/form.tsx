"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { GraduationCap } from "lucide-react"

import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "../../../components/ui/form"

import { Input } from "../../../components/ui/input"
import { PasswordInput } from "../../../components/ui/password-input"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"

import { signup } from "../_actions/auth.action"

const formSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(10, "Phone is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function SignupForm() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created successfully")
      router.push("/auth/verify-otp")
    },
    onError: (error: unknown) => {
      console.error("Frontend signup mutation error:", error) // Log the error object on the frontend
      if (error instanceof Error) {
        toast.error(error.message)
      } else if (error && typeof error === "object" && "message" in error) {
        toast.error((error as { message?: string }).message || "Signup failed")
      } else {
        toast.error("Signup failed: An unknown error occurred.")
      }
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signupMutation.mutate(data)
  }

  return (
    <Card className="border-0 shadow-lg max-w-md w-full mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Fill in your information to sign up</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Re-enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={signupMutation.isPending}>
              {signupMutation.isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <a href="/auth/login" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
