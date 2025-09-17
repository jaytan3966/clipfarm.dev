"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/context/userProfileContext";
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  Video,
  Scissors,
  Settings,
  ChevronDown,
  CreditCard,
  Coins,
  History,
  Sparkles,
  Calendar,
  LogOut,
  CircleUser,
  CheckCircle,
  AlertCircle,
  Clock,
  Upload,
} from "lucide-react";

export default function AppSidebar({ isDarkMode }: { isDarkMode: boolean }) {
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
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/pages/upload")}
                className={`px-3 py-2 rounded-md hover:cursor-pointer transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-100"
                    : "hover:bg-purple-50 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-semibold">
                    Upload Your Clips
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
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
