"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DashboardLayout } from "../layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { User, Lock, SettingsIcon } from "lucide-react";
import { studentApi } from "../../../lib/api";
import { useAuthStore } from "../../../lib/auth";
import { PasswordInput } from "../../ui/password-input";

const profileFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export function SettingsManagement() {
  const { token, user, updateUser } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["adminProfile", user?.id],
    queryFn: () => studentApi.getProfile(token!),
    enabled: !!token && !!user?.id,
    initialData: user, // Use the user from auth store as initial data
  });

  // Profile Form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    values: {
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (profile) {
      profileForm.reset({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile, profileForm]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: z.infer<typeof profileFormSchema>) =>
      studentApi.updateProfile(data, token!),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["adminProfile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        toast.error(
          (error as { message?: string }).message || "Failed to update profile"
        );
      } else {
        toast.error("Failed to update profile");
      }
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    updateProfileMutation.mutate(data);
  };

  // Password Form
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: z.infer<typeof passwordFormSchema>) => {
      
      console.log("Changing password with data:", data);
      return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
      passwordForm.reset();
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        toast.error(
          (error as { message?: string }).message || "Failed to change password"
        );
      } else {
        toast.error("Failed to change password");
      }
    },
  });

  const onPasswordSubmit = (data: z.infer<typeof passwordFormSchema>) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and system preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-fit">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account">
              <Lock className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="system">
              <SettingsIcon className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isProfileLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Form {...profileForm}>
                    <form
                      onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your email"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending
                          ? "Saving..."
                          : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account credentials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="Enter current password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="Enter new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="Confirm new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={changePasswordMutation.isPending}
                    >
                      {changePasswordMutation.isPending
                        ? "Updating..."
                        : "Change Password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure institution-wide settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This section is for global system configurations. You can add
                  settings like:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Default enrollment period</li>
                  <li>Notification preferences</li>
                  <li>Integration settings</li>
                  <li>Data backup schedules</li>
                </ul>
                <Button disabled>Save System Settings (Placeholder)</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
