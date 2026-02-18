import { CourseDetail } from "@/features/courses/components/course-detail";

interface UserCoursePageProps {
  params: {
    id: string;
  };
}

export default function UserCoursePage({ params }: UserCoursePageProps) {
  return <CourseDetail courseId={params.id} />;
}

export async function generateMetadata({ params }: UserCoursePageProps) {
  return {
    title: `Course ${params.id} - My Courses`,
    description: `View details for course ${params.id}`,
  };
}
