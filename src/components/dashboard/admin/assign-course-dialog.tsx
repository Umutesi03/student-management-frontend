"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { UserPlus } from "lucide-react";
import { coursesApi, adminApi } from "../../../lib/api";
import { useAuthStore } from "../../../lib/auth";

const assignCourseSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  courseId: z.string().min(1, "Please select a course"),
});

export function AssignCourseDialog() {
  const [open, setOpen] = useState(false);
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof assignCourseSchema>>({
    resolver: zodResolver(assignCourseSchema),
    defaultValues: {
      studentId: "",
      courseId: "",
    },
  });

  // Fetch students and courses
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: () => adminApi.getStudents(token!),
    enabled: !!token && open,
  });

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => coursesApi.getAllCourses(token!),
    enabled: !!token && open,
  });

  const assignCourseMutation = useMutation({
    mutationFn: (data: z.infer<typeof assignCourseSchema>) =>
      coursesApi.assignCourse(data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Course assigned successfully");
      setOpen(false);
      form.reset();
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        toast.error(
          (error as { message?: string }).message || "Failed to assign course"
        );
      } else {
        toast.error("Failed to assign course");
      }
    },
  });

  const onSubmit = (data: z.infer<typeof assignCourseSchema>) => {
    assignCourseMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Course to Student</DialogTitle>
          <DialogDescription>
            Select a student and course to create an enrollment.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students?.map(
                        (student: {
                          id: string;
                          fullName: string;
                          email: string;
                        }) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.fullName} ({student.email})
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses?.map((course: { id: string; name: string }) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={assignCourseMutation.isPending}>
                {assignCourseMutation.isPending
                  ? "Assigning..."
                  : "Assign Course"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
