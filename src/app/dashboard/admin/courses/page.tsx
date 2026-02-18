import { CoursesTable } from "@/features/courses/components/courses-table";

export default function CoursesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Courses Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage and monitor all courses in the system
          </p>
        </div>

        <CoursesTable />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Courses - Admin Dashboard",
  description: "Manage and monitor all courses in the system",
};
