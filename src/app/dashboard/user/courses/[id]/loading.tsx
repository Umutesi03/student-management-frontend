import { PageLoading } from "@/shared/components/loading";

export default function UserCourseLoadingPage() {
  return (
    <PageLoading
      title="Loading Course"
      subtitle="Please wait while we fetch your course information..."
    />
  );
}
