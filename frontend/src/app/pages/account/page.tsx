"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext"
import { useUserProfile } from "@/context/userProfileContext"
import { useDarkMode } from "@/context/darkModeContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Video,
  Scissors,
  Settings,
  Bell,
  ChevronDown,
  CreditCard,
  Coins,
  History,
  Sparkles,
  Calendar,
  LogOut,
  CircleUser,
  MoonStar,
  Sun,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Mail,
  Save,
  Camera,
} from "lucide-react"

function AppSidebar({ isDarkMode }: { isDarkMode: boolean }) {
  const router = useRouter()
  const [openSections, setOpenSections] = useState({
    pastClips: true,
    tokens: false,
    generate: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error.message)
    } else {
      router.push("/")
    }
  }

  const user = useUserProfile()

  const pastClipsItems = [
    { title: "All Clips", count: 127, icon: Video },
    { title: "This Week", count: 12, icon: Calendar },
    { title: "Completed", count: 115, icon: CheckCircle },
    { title: "Processing", count: 3, icon: Clock },
    { title: "Failed", count: 9, icon: AlertCircle },
  ]

  const tokenItems = [
    { title: "Current Balance", value: "2,450 tokens", icon: Coins },
    { title: "Usage This Month", value: "1,200 tokens", icon: History },
    { title: "Buy More Tokens", action: true, icon: CreditCard },
    { title: "Payment History", action: true, icon: History },
  ]

  const generateItems = [
    { title: "Quick Generate", description: "Upload & auto-clip", icon: Sparkles },
    { title: "Batch Process", description: "Multiple videos", icon: Video },
    { title: "Custom Settings", description: "Advanced options", icon: Settings },
  ]

  return (
    <Sidebar
      className={`border-r shadow-sm hover:cursor-pointer transition-all duration-200 ease-in-out ${
        isDarkMode ? "border-gray-700 bg-gray-900" : "border-purple-200 bg-white"
      }`}
    >
      <SidebarHeader
        className={`border-b transition-colors duration-200 ease-in-out ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
        }`}
      >
        <div className="flex items-center space-x-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Scissors className="h-4 w-4 text-white" />
          </div>
          <span
            className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => router.push("/pages/dashboard")}
          >
            clipfarm.dev
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Past Clips Section */}
        <Collapsible
          open={openSections.pastClips}
          onOpenChange={() => toggleSection("pastClips")}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                  isDarkMode ? "hover:bg-gray-700 text-gray-100" : "hover:bg-purple-50 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Past Clips</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ease-in-out ${
                    openSections.pastClips ? "rotate-180" : ""
                  } ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {pastClipsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={`flex items-center justify-between hover:cursor-pointer px-3 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-300 hover:text-gray-100"
                            : "hover:bg-purple-50 text-gray-700 hover:text-gray-900"
                        }`}
                        onClick={() => router.push("/pages/dashboard")}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <span className="text-sm">{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Tokens & Payments Section */}
        <Collapsible
          open={openSections.tokens}
          onOpenChange={() => toggleSection("tokens")}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                  isDarkMode ? "hover:bg-gray-700 text-gray-100" : "hover:bg-purple-50 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Tokens & Payments</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ease-in-out ${
                    openSections.tokens ? "rotate-180" : ""
                  } ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {tokenItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={`px-3 py-2 rounded-md hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                          item.action
                            ? isDarkMode
                              ? "text-purple-400 hover:text-purple-300 hover:bg-gray-700"
                              : "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            : isDarkMode
                              ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                              : "text-gray-700 hover:text-gray-900 hover:bg-purple-50"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{item.title}</span>
                            {item.value && (
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {item.value}
                              </span>
                            )}
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Generate Clips Section */}
        <Collapsible
          open={openSections.generate}
          onOpenChange={() => toggleSection("generate")}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                  isDarkMode ? "hover:bg-gray-700 text-gray-100" : "hover:bg-purple-50 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Generate Clips</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ease-in-out ${
                    openSections.generate ? "rotate-180" : ""
                  } ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {generateItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={`px-3 py-2 rounded-md hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-300 hover:text-gray-100"
                            : "hover:bg-purple-50 text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{item.title}</span>
                            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter
        className={`border-t transition-colors duration-200 ease-in-out ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
        }`}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={`w-full px-3 py-2 rounded-lg transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-purple-100"
                  }`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="bg-purple-500 text-white text-xs">
                      {user ? user.username[0].toUpperCase() : "0"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left hover:cursor-pointer">
                    <span className={`text-sm font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                      {user ? user.username : "null"}
                    </span>
                    <span className="text-xs text-purple-600 font-medium">Pro Plan</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className={`w-56 transition-colors duration-200 ease-in-out ${
                  isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "text-gray-900"
                }`}
              >
                <DropdownMenuItem
                  className={`hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "hover:bg-gray-700 bg-gray-700" : "hover:bg-purple-50 bg-purple-100"
                  }`}
                  onClick={() => router.push("/pages/account")}
                >
                  <CircleUser className="mr-2 h-4 w-4" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-purple-50"
                  }`}
                  onClick={() => router.push("/pages/billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => logout()}
                  className={`hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-purple-50"
                  }`}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const session = useAuth()
  const user = useUserProfile()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setAlert(null)

    try {
      const response = await fetch("/api/accountInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          username: formData.username !== user?.username ? formData.username : undefined,
          email: formData.email !== user?.email ? formData.email : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      if (formData.newPassword) {
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
        }))
      }

      setAlert({ type: "success", message: data.message })
    } catch  {
      setAlert({ type: "error", message: "Failed to update profile" })
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (session === null) {
      router.push("/")
    } else {
      setIsLoading(false)
      if (user) {
        setFormData((prev) => ({
          ...prev,
          username: user.username || "",
          email: user.email || "",
        }))
      }
    }
  }, [session, router, user])

  if (isLoading) return null

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
              isDarkMode ? "border-gray-700 bg-gray-900/90" : "border-purple-200 bg-white/90"
            }`}
          >
            <SidebarTrigger
              className={`-ml-1 w-8 h-8 hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                isDarkMode ? "text-gray-400 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
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
                    isDarkMode ? "text-gray-400 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className={`transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-400 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
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
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
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
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
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
  )
}
