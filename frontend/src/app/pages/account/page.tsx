"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/authContext";
import { useUserProfile } from "@/context/userProfileContext";
import { useDarkMode } from "@/context/darkModeContext";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bell,
  CircleUser,
  MoonStar,
  Sun,
  User,
  Mail,
  Save,
  Camera,
} from "lucide-react";
import AppSidebar from "@/components/sidebar";

export default function AccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const session = useAuth();
  const user = useUserProfile();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setAlert(null);

    try {
      const response = await fetch("/api/accountInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          username:
            formData.username !== user?.username
              ? formData.username
              : undefined,
          email: formData.email !== user?.email ? formData.email : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      if (formData.newPassword) {
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
        }));
      }

      setAlert({ type: "success", message: data.message });
    } catch {
      setAlert({ type: "error", message: "Failed to update profile" });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (session === null) {
      router.push("/");
    } else {
      setIsLoading(false);
      if (user) {
        setFormData((prev) => ({
          ...prev,
          username: user.username || "",
          email: user.email || "",
        }));
      }
    }
  }, [session, router, user]);

  if (isLoading) return null;

  return (
    <SidebarProvider>
      <div
        className={`flex min-h-screen w-full transition-colors duration-200 ease-in-out ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
        }`}
      >
        <AppSidebar isDarkMode={isDarkMode} />
        <SidebarInset className="flex-1 transition-all duration-200 ease-in-out">
          <header
            className={`flex h-16 shrink-0 items-center gap-2 border-b backdrop-blur-sm px-6 shadow-sm transition-colors duration-200 ease-in-out ${
              isDarkMode
                ? "border-gray-700 bg-gray-900/90"
                : "border-purple-200 bg-white/90"
            }`}
          >
            <SidebarTrigger
              className={`-ml-1 w-8 h-8 hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h1
                  className={`text-xl font-semibold transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  My Account
                </h1>
                <p
                  className={`text-sm transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your profile and account settings
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className={`transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <MoonStar className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {alert && (
                <Alert
                  className={`transition-colors duration-200 ease-in-out ${
                    alert.type === "success"
                      ? isDarkMode
                        ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700"
                        : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                      : isDarkMode
                        ? "bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-700"
                        : "bg-gradient-to-r from-red-50 to-pink-50 border-red-300"
                  }`}
                >
                  <AlertDescription
                    className={`transition-colors duration-200 ease-in-out ${
                      alert.type === "success"
                        ? isDarkMode
                          ? "text-green-300"
                          : "text-green-700"
                        : isDarkMode
                          ? "text-red-300"
                          : "text-red-700"
                    }`}
                  >
                    {alert.message}
                  </AlertDescription>
                </Alert>
              )}

              <Card
                className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardHeader>
                  <CardTitle
                    className={`flex items-center space-x-2 transition-colors duration-200 ease-in-out ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    <User className="h-5 w-5 text-purple-600" />
                    <span>Profile Picture</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                        {user ? user.username[0].toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button
                        variant="outline"
                        className={`border-purple-200 bg-transparent transition-colors duration-200 ease-in-out ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-100 border-gray-600"
                            : "hover:bg-purple-50 text-gray-900"
                        }`}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p
                        className={`text-sm mt-2 transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardHeader>
                  <CardTitle
                    className={`flex items-center space-x-2 transition-colors duration-200 ease-in-out ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    <CircleUser className="h-5 w-5 text-purple-600" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Username
                    </Label>
                    <div className="relative">
                      <User
                        className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-400" : "text-gray-900"
                        }`}
                      />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`pl-10 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200 ease-in-out ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                            : "border-gray-300 text-gray-900"
                        }`}
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-400" : "text-gray-900"
                        }`}
                      />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200 ease-in-out ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                            : "border-gray-300 text-gray-900"
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 transition-all duration-200 ease-in-out"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
