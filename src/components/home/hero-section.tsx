import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/20 transition-colors">
              Streamline your educational institution management.{" "}
              <Link href="#features" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Learn more <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Modern <span className="text-primary">Student Management</span> System
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Empower your educational institution with comprehensive tools for student enrollment, academic tracking, and
            administrative efficiency. Built for the modern era.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/auth/signup">
              <Button size="lg" className="h-12 px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                View Features
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Student Management</h3>
              <p className="text-sm text-muted-foreground text-center">
                Comprehensive student profiles and enrollment tracking
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Academic Tracking</h3>
              <p className="text-sm text-muted-foreground text-center">
                Monitor grades, attendance, and academic progress
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Analytics & Reports</h3>
              <p className="text-sm text-muted-foreground text-center">
                Detailed insights and customizable reporting tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
