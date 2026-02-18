import { StudentDetail } from "@/features/students/components/student-detail";

interface StudentPageProps {
  params: {
    id: string;
  };
}

export default function StudentPage({ params }: StudentPageProps) {
  return <StudentDetail studentId={params.id} />;
}

export async function generateMetadata({ params }: StudentPageProps) {
  return {
    title: `Student ${params.id} - Student Management`,
    description: `View and manage details for student ${params.id}`,
  };
}
