import { AlertCircle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "destructive" | "warning";
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  action,
  variant = "default",
  className,
}: ErrorStateProps) {
  const variants = {
    default: {
      icon: "text-gray-500",
      title: "text-gray-900 dark:text-white",
      message: "text-gray-600 dark:text-gray-300",
    },
    destructive: {
      icon: "text-red-500",
      title: "text-red-900 dark:text-red-100",
      message: "text-red-600 dark:text-red-300",
    },
    warning: {
      icon: "text-amber-500",
      title: "text-amber-900 dark:text-amber-100",
      message: "text-amber-600 dark:text-amber-300",
    },
  };

  const variantStyles = variants[variant];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-6 p-8 text-center",
        className
      )}
    >
      <AlertCircle className={cn("h-16 w-16", variantStyles.icon)} />
      <div className="space-y-2">
        <h3 className={cn("text-xl font-semibold", variantStyles.title)}>
          {title}
        </h3>
        <p className={cn("max-w-md", variantStyles.message)}>{message}</p>
      </div>

      {action && (
        <Button onClick={action.onClick} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface NotFoundStateProps {
  title?: string;
  message?: string;
  backHref?: string;
  backLabel?: string;
  homeHref?: string;
  className?: string;
}

export function NotFoundState({
  title = "Not Found",
  message = "The item you're looking for doesn't exist or has been removed.",
  backHref,
  backLabel = "Go Back",
  homeHref = "/dashboard",
  className,
}: NotFoundStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-6 p-8 text-center",
        className
      )}
    >
      <div className="text-6xl font-bold text-gray-300 dark:text-gray-600">
        404
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">{message}</p>
      </div>

      <div className="flex space-x-4">
        {backHref && (
          <Button asChild variant="outline">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backLabel}
            </Link>
          </Button>
        )}

        <Button asChild>
          <Link href={homeHref}>
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data available",
  message = "Get started by creating your first item.",
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-6 p-8 text-center",
        className
      )}
    >
      {icon && <div className="text-gray-400 dark:text-gray-600">{icon}</div>}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">{message}</p>
      </div>

      {action &&
        (action.href ? (
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        ))}
    </div>
  );
}

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
}

export function ErrorBoundaryFallback({
  error,
  resetError,
}: ErrorBoundaryFallbackProps) {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>Application Error</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          An unexpected error occurred in the application.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="text-xs">
            <summary className="cursor-pointer text-gray-500">
              Error details
            </summary>
            <pre className="mt-2 whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex space-x-2">
          <Button onClick={resetError} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
