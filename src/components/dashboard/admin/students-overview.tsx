"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { adminApi } from "../../../lib/api";
import { useAuthStore } from "../../../lib/auth";

export function StudentsOverview() {
  const { token } = useAuthStore();

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () => adminApi.getStudents(token!),
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Students Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentStudents = students?.slice(0, 5) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentStudents.map(
            (student: {
              id: string;
              fullName: string;
              email: string;
              phone?: string;
              address?: string;
              role?: string;
            }) => (
              <div
                key={student.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{student.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {student.email}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {student.role}
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
