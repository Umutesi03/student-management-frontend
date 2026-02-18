import { CourseDetail } from "@/features/courses/components/course-detail";

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  return <CourseDetail courseId={params.id} />;
}

export async function generateMetadata({ params }: CoursePageProps) {
  return {
    title: `Course ${params.id} - Student Management`,
    description: `View and manage details for course ${params.id}`,
  };
}
