import { PageLoading } from "@/shared/components/loading";

export default function CourseLoadingPage() {
  return (
    <PageLoading
      title="Loading Course Details"
      subtitle="Please wait while we fetch the course information..."
    />
  );
}
