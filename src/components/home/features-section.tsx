import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  BookOpen,
  BarChart3,
  Shield,
  Clock,
  Globe,
  // GraduationCap,
  // FileText,
  // Bell,
  Database,
  Award,
  Mail,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Student Lifecycle",
      description:
        "Manage enrollment, attendance, and progression through intuitive interfaces.",
    },
    {
      icon: BookOpen,
      title: "Academic Tracking",
      description:
        "Comprehensive gradebooks, assignment tracking, and progress monitoring.",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description:
        "Visual dashboards with actionable insights for administrators.",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with FERPA compliance and RBAC.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Instant notifications and live updates across all modules.",
    },
    {
      icon: Globe,
      title: "Multi-campus",
      description: "Manage multiple locations from a single unified platform.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-green-50 dark:bg-background/80">
      <div className="container mx-auto">
        <div className="text-center mb-16 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-900 dark:text-white">
            Powerful Features for{" "}
            <span className="text-green-600 dark:text-green-400">
              Modern Education
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to streamline operations and enhance learning
            outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 h-full border border-green-100 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl text-gray-800 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-gray-700 shadow-sm">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full w-fit mx-auto mb-4">
              <Database className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
              Centralized Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Single source of truth for all student information
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-gray-700 shadow-sm">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full w-fit mx-auto mb-4">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
              Accreditation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tools to maintain compliance standards
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-gray-700 shadow-sm">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full w-fit mx-auto mb-4">
              <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
              Communication
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Built-in messaging for all stakeholders
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-gray-700 shadow-sm">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full w-fit mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
              Reporting
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Customizable reports for any need
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
