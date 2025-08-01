import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, BarChart3, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-primary/5 dark:to-secondary/5">
      <div className="absolute inset-0">
        <Image
          src="/images/students-in-lab.png"
          alt="Students learning in lab"
          fill
          className="object-cover opacity-60 dark:opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-background/70" />
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-200/50 blur-xl dark:bg-primary/20" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-green-300/50 blur-xl dark:bg-secondary/20" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium border bg-white/80 backdrop-blur-sm mb-8 shadow-sm border-green-200 dark:border-primary/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Trusted by 500+ institutions
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white">
            Modern{" "}
            <span className="text-green-600 dark:text-green-400">
              Student Management
            </span>{" "}
            System
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Empower your educational institution with comprehensive tools for
            student enrollment, academic tracking, and administrative
            efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 gap-2 border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="flex flex-col items-center p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-green-100 shadow-sm dark:bg-background/80 dark:border-primary/20">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                Students
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">10K+</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-green-100 shadow-sm dark:bg-background/80 dark:border-primary/20">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                Courses
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">500+</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-green-100 shadow-sm dark:bg-background/80 dark:border-primary/20">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                Success
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">99.9%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
