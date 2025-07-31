import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, BarChart3, Shield, Clock, Globe, GraduationCap, FileText, Bell } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Student Management",
      description:
        "Complete student lifecycle management from enrollment to graduation with detailed profiles and tracking.",
    },
    {
      icon: BookOpen,
      title: "Academic Tracking",
      description: "Monitor courses, grades, attendance, and academic progress with comprehensive reporting tools.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time insights and analytics to make data-driven decisions for your institution.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with FERPA compliance and role-based access controls.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Instant notifications and updates across all modules for seamless communication.",
    },
    {
      icon: Globe,
      title: "Multi-campus Support",
      description: "Manage multiple campuses and locations from a single, unified platform.",
    },
    {
      icon: GraduationCap,
      title: "Graduation Tracking",
      description: "Track student progress towards graduation requirements and generate transcripts.",
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized document storage and management for all student and institutional records.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Automated alerts and reminders for important deadlines, events, and milestones.",
    },
  ]

  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to manage your institution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to streamline operations and enhance the educational experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="rounded-lg bg-primary/10 p-2 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
