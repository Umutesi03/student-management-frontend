"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Badge } from "../../ui/badge"
import { Separator } from "../../ui/separator"
import { profileApi } from "@/shared/utils/api"
import { useAuthStore } from "@/lib/auth"
import { LoadingState } from "@/shared/components/loading"
import { ErrorState } from "@/shared/components/error-states"
import { toast } from "sonner"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Shield
} from "lucide-react"
import { format } from "date-fns"

export function UserProfile() {
  const { token, user, updateUser } = useAuthStore()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  })

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      const response = await profileApi.get(token)
      return response.data
    },
    enabled: !!token,
  })

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<typeof editData>) => {
      if (!token) throw new Error("No authentication token")
      const response = await profileApi.update(data, token)
      return response.data
    },
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      updateUser(updatedProfile)
      setIsEditing(false)
      toast.success("Profile updated successfully")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to update profile"
      toast.error(message)
    },
  })

  if (isLoading) {
    return <LoadingState message="Loading your profile..." />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Profile"
        message="Unable to fetch your profile information. Please try again."
        action={{
          label: "Retry",
          onClick: () => window.location.reload()
        }}
        variant="destructive"
      />
    )
  }

  const handleEdit = () => {
    if (profile) {
      setEditData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || ""
      })
    }
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync(editData)
    } catch (error) {
      // Error is handled by the mutation hook
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      fullName: "",
      email: "",
      phone: "",
      address: ""
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage your personal information and account settings
            </p>
          </div>
          
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleSave} 
                  disabled={updateMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm font-medium">{profile?.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm">{profile?.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm">{profile?.phone || "Not provided"}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="address"
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm">{profile?.address || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Account Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Student ID</span>
                  <Badge variant="outline">{profile?.id}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Role</span>
                  <Badge variant={profile?.role === "admin" ? "default" : "secondary"}>
                    {profile?.role}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Account Status</span>
                  <Badge variant={profile?.isVerified ? "default" : "destructive"}>
                    {profile?.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Member Since</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {profile?.createdAt ? format(new Date(profile.createdAt), "MMMM yyyy") : "Unknown"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Last Updated</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {profile?.updatedAt ? format(new Date(profile.updatedAt), "PPP") : "Unknown"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Update Email
                </Button>
                <p className="text-xs text-muted-foreground">
                  For security changes, please contact your administrator.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
