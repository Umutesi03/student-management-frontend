import { StudentsTable } from "@/features/students/components/students-table";

export default function StudentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Students Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage and monitor all students in the system
          </p>
        </div>

        <StudentsTable />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Students - Admin Dashboard",
  description: "Manage and monitor all students in the system",
};
