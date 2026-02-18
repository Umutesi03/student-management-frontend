import { PageLoading } from "@/shared/components/loading";

export default function StudentLoadingPage() {
  return (
    <PageLoading
      title="Loading Student Details"
      subtitle="Please wait while we fetch the student information..."
    />
  );
}
