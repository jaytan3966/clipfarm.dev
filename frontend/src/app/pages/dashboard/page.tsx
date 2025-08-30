"use client";

import { useState } from "react";

import Image from "next/image";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/authContext";
import { useUserProfile } from "@/context/userProfileContext";
import { useDarkMode } from "@/context/darkModeContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Play,
  Download,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  Video,
  Scissors,
  Eye,
  Share2,
  Settings,
  Bell,
  ChevronDown,
  CreditCard,
  Coins,
  History,
  Sparkles,
  Calendar,
  Trash,
  LogOut,
  CircleUser,
  MoonStar,
  Sun,
} from "lucide-react";

function AppSidebar({ isDarkMode }: { isDarkMode: boolean }) {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openSections, setOpenSections] = useState({
    pastClips: true,
    tokens: false,
    generate: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const showLogoutConfirmation = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.push("/");
    }
    setShowLogoutModal(false);
  };

  const user = useUserProfile();

  const pastClipsItems = [
    { title: "All Clips", count: 127, icon: Video },
    { title: "This Week", count: 12, icon: Calendar },
    { title: "Completed", count: 115, icon: CheckCircle },
    { title: "Processing", count: 3, icon: Clock },
    { title: "Failed", count: 9, icon: AlertCircle },
  ];

  const tokenItems = [
    { title: "Current Balance", value: "2,450 tokens", icon: Coins },
    { title: "Usage This Month", value: "1,200 tokens", icon: History },
    { title: "Buy More Tokens", action: true, icon: CreditCard },
    { title: "Payment History", action: true, icon: History },
  ];

  const generateItems = [
    {
      title: "Quick Generate",
      description: "Upload & auto-clip",
      icon: Sparkles,
    },
    { title: "Batch Process", description: "Multiple videos", icon: Video },
    {
      title: "Custom Settings",
      description: "Advanced options",
      icon: Settings,
    },
  ];

  return (
    <Sidebar
      className={`border-r shadow-sm hover:cursor-pointer transition-all duration-200 ease-in-out transform ${
        isDarkMode
          ? "border-gray-700 bg-gray-900"
          : "border-purple-200 bg-white"
      }`}
    >
      <SidebarHeader
        className={`border-b transition-all duration-200 ${
          isDarkMode
            ? "border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900"
            : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
        }`}
      >
        <div className="flex items-center space-x-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Scissors className="h-4 w-4 text-white" />
          </div>
          <span
            className={`text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:cursor-pointer`}
            onClick={() => router.push("/")}
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
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 hover:cursor-pointer transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-100"
                    : "hover:bg-purple-50 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Past Clips</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-all duration-200 ${
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
                        className={`flex items-center justify-between hover:cursor-pointer px-3 py-2 rounded-md transition-all duration-200 ${
                          isDarkMode
                            ? "hover:bg-gray-800 text-gray-300 hover:text-gray-100"
                            : "hover:bg-purple-50 text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon
                            className={`h-4 w-4 transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                          />
                          <span className="text-sm">{item.title}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs transition-all duration-200 ${
                            isDarkMode
                              ? "bg-gray-700 text-purple-300 hover:bg-gray-600"
                              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          }`}
                        >
                          {item.count}
                        </Badge>
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
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 hover:cursor-pointer transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-100"
                    : "hover:bg-purple-50 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">
                    Tokens & Payments
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-all duration-200 ${
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
                        className={`px-3 py-2 rounded-md hover:cursor-pointer transition-all duration-200 ${
                          item.action
                            ? isDarkMode
                              ? "text-purple-400 hover:text-purple-300 hover:bg-gray-800"
                              : "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            : isDarkMode
                              ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                              : "text-gray-700 hover:text-gray-900 hover:bg-purple-50"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                            {item.value && (
                              <span
                                className={`text-xs transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                              >
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
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 hover:cursor-pointer transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-100"
                    : "hover:bg-purple-50 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Generate Clips</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-all duration-200 ${
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
                        className={`px-3 py-2 rounded-md hover:cursor-pointer transition-all duration-200 ${
                          isDarkMode
                            ? "hover:bg-gray-800 text-gray-300 hover:text-gray-100"
                            : "hover:bg-purple-50 text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon
                            className={`h-4 w-4 transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                            <span
                              className={`text-xs transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
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
        className={`border-t transition-all duration-200 ${
          isDarkMode
            ? "border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900"
            : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
        }`}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={`w-full px-3 py-2 rounded-lg transition-all duration-200 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"}`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="bg-purple-500 text-white text-xs">
                      {user ? user.username[0].toUpperCase() : "0"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left hover:cursor-pointer">
                    <span
                      className={`text-sm font-medium transition-colors duration-200 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                    >
                      {user ? user.username : "null"}
                    </span>
                    <span className="text-xs text-purple-600 font-medium">
                      Pro Plan
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className={`w-56 transition-all duration-200 ${isDarkMode ? "bg-gray-800 text-gray-100" : "text-gray-900"}`}
              >
                <DropdownMenuItem
                  className={`hover:cursor-pointer transition-all duration-200 ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-purple-50"
                  }`}
                  onClick={() => router.push("/pages/account")}
                >
                  <CircleUser className="mr-2 h-4 w-4" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`hover:cursor-pointer transition-all duration-200 ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-purple-50"
                  }`}
                  onClick={() => router.push("/pages/billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={showLogoutConfirmation}
                  className={`hover:cursor-pointer transition-all duration-200 ${
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

      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent
          className={`transition-all duration-500 ease-in-out ${isDarkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900"}`}
        >
          <DialogHeader>
            <DialogTitle
              className={`transition-colors duration-500 ease-in-out ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              Confirm Logout
            </DialogTitle>
            <DialogDescription
              className={`transition-colors duration-500 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Are you sure you want to log out? You&apos;ll need to sign in
              again to access your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className={`transition-all duration-200 ${
                isDarkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white transition-all duration-500 ease-in-out"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}

export default function Dashboard() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Mock data for past clips
  const pastClips = [
    {
      id: 1,
      title: "Marketing Webinar Highlights",
      thumbnail: "/placeholder.svg?height=160&width=240",
      duration: "0:45",
      status: "completed",
      views: 1234,
      created: "2 hours ago",
      platform: "YouTube Shorts",
    },
    {
      id: 2,
      title: "Product Demo Key Moments",
      thumbnail: "/placeholder.svg?height=160&width=240",
      duration: "1:20",
      status: "processing",
      views: 0,
      created: "5 hours ago",
      platform: "TikTok",
    },
    {
      id: 3,
      title: "Interview Best Parts",
      thumbnail: "/placeholder.svg?height=160&width=240",
      duration: "0:58",
      status: "completed",
      views: 856,
      created: "1 day ago",
      platform: "Instagram Reels",
    },
    {
      id: 4,
      title: "Tutorial Highlights",
      thumbnail: "/placeholder.svg?height=160&width=240",
      duration: "1:15",
      status: "failed",
      views: 0,
      created: "2 days ago",
      platform: "YouTube Shorts",
    },
    {
      id: 5,
      title: "Podcast Best Moments",
      thumbnail: "/placeholder.svg?height=160&width=240",
      duration: "2:10",
      status: "completed",
      views: 2341,
      created: "3 days ago",
      platform: "TikTok",
    },
  ];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const session = useAuth();

  useEffect(() => {
    if (session === null) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  if (isLoading) return null;

  return (
    <SidebarProvider>
      <div
        className={`flex min-h-screen w-full transition-all duration-200 ease-in-out ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
        }`}
      >
        <AppSidebar isDarkMode={isDarkMode} />
        <SidebarInset className="flex-1 transition-all duration-200 ease-in-out">
          {/* Header */}
          <header
            className={`flex h-16 shrink-0 items-center gap-2 border-b px-6 shadow-sm transition-all duration-200 ${
              isDarkMode
                ? "border-gray-700 bg-gray-900/90 backdrop-blur-sm"
                : "border-purple-200 bg-white/90 backdrop-blur-sm"
            }`}
          >
            <SidebarTrigger
              className={`-ml-1 w-8 h-8 hover:cursor-pointer transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h1
                  className={`text-xl font-semibold transition-colors duration-200 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  Dashboard
                </h1>
                <p
                  className={`text-sm transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Manage your clips and generate new content
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-all duration-200 ${
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
                  className={`transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={toggleDarkMode}
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

          {/* Main Content */}
          <main
            className={`flex-1 p-6 transition-all duration-200 ${isDarkMode ? "bg-gray-900/50" : "bg-transparent"}`}
          >
            <div className="mb-6">
              <h2
                className={`text-2xl font-bold mb-2 transition-colors duration-200 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
              >
                Your Clips
              </h2>
              <p
                className={`transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Create new clips or manage your existing ones
              </p>
            </div>

            {/* Clips Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Create New Clip Card */}
              <Card
                className={`border-2 border-dashed hover:shadow-md transition-all duration-200 cursor-pointer group ${
                  isDarkMode
                    ? "border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-gray-500 hover:shadow-gray-900/50"
                    : "border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-400"
                }`}
              >
                <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <h3
                    className={`font-semibold text-lg mb-2 transition-colors duration-200 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                  >
                    Create New Clip
                  </h3>
                  <p
                    className={`text-sm transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Upload a video and let AI create engaging clips
                  </p>
                </CardContent>
              </Card>

              {/* Past Clips */}
              {pastClips.map((clip) => (
                <Card
                  key={clip.id}
                  className={`overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border pt-0 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:shadow-gray-900/50"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="relative">
                    <Image
                      src="/cat-space.gif"
                      width={750}
                      height={750}
                      alt="ClipFarm.dev Dashboard"
                      className="block w-full h-auto aspect-video rounded-t-xl object-cover object-center shadow-2xl"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                      {clip.duration}
                    </div>
                    <div className="absolute top-2 left-2">
                      {clip.status === "completed" && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Done
                        </Badge>
                      )}
                      {clip.status === "processing" && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                          <Clock className="mr-1 h-3 w-3" />
                          Processing
                        </Badge>
                      )}
                      {clip.status === "failed" && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-black/60 text-white backdrop-blur-sm"
                        >
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent
                    className={`transition-all duration-200 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                  >
                    <h3
                      className={`font-semibold text-sm mb-2 line-clamp-2 transition-colors duration-200 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                    >
                      {clip.title}
                    </h3>
                    <div
                      className={`flex items-center justify-between text-xs mb-2 transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      <span className="font-medium">{clip.platform}</span>
                      <span>{clip.created}</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 text-xs transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      <Eye className="h-3 w-3" />
                      <span className="font-medium">
                        {clip.views.toLocaleString()} views
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
