"use client";

import { ErrorBoundaryFallback } from "@/shared/components/error-states";

interface StudentErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StudentErrorPage({
  error,
  reset,
}: StudentErrorPageProps) {
  return <ErrorBoundaryFallback error={error} resetError={reset} />;
}
