import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "../../ui/progress";

type Course = {
  id: number;
  name: string;
  progress?: number;
  grade?: string; 
};

export function AcademicProgress({ courses }: { courses: Course[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.length === 0 ? (
            <div className="text-muted-foreground">
              No courses enrolled yet.
            </div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{course.name}</span>
                  {course.grade && (
                    <span className="text-sm font-semibold text-primary">
                      {course.grade}
                    </span>
                  )}
                </div>
                {course.progress !== undefined ? (
                  <>
                    <Progress value={course.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {course.progress}% Complete
                    </div>
                  </>
                ) : null}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
