"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
import { Separator } from "../../ui/separator"
import { Settings, Bell, Shield, Database, Mail } from "lucide-react"

export function SettingsManagement() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Configure system preferences and administrative settings
          </p>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                defaultValue="Student Management System"
                placeholder="Enter system name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Administrator Email</Label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@example.com"
                placeholder="Enter admin email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStudents">Maximum Students per Course</Label>
              <Input
                id="maxStudents"
                type="number"
                defaultValue="50"
                placeholder="Enter maximum students"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Student Self-Registration</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Allow students to register themselves
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Verification Required</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Require email verification for new accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Send email notifications for important events
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Student Registration Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Notify admins when new students register
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Course Enrollment Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Notify instructors of new enrollments
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                defaultValue="60"
                placeholder="Enter session timeout"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Password Requirements</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Enforce strong password policies
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Backups</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Schedule automatic data backups
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <select 
                id="backupFrequency" 
                className="w-full p-2 border rounded-md bg-background"
                defaultValue="daily"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Data Retention</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automatically delete old records
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
