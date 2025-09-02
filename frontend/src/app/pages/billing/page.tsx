"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/authContext";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  CheckCircle,
  AlertCircle,
  Clock,
  Crown,
  Zap,
  Download,
  ArrowUpRight,
  DollarSign,
  Activity,
  Check,
  X,
  MoonStar,
  Sun,
} from "lucide-react";
import { useDarkMode } from "@/context/darkModeContext";

function AppSidebar({ isDarkMode }: { isDarkMode: boolean }) {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({
    pastClips: true,
    tokens: false,
    generate: false,
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
      className={`border-r shadow-sm hover:cursor-pointer transition-all duration-200 ease-in-out ${
        isDarkMode
          ? "border-gray-700 bg-gray-900"
          : "border-purple-200 bg-white"
      }`}
    >
      <SidebarHeader
        className={`border-b transition-colors duration-200 ease-in-out ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
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
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-100"
                    : "hover:bg-purple-50 text-gray-900"
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
                        className={`flex items-center justify-between hover:cursor-pointer px-3 py-2 rounded-md transition-colors duration-300 ${
                          isDarkMode
                            ? "hover:bg-gray-800 text-gray-300 hover:text-gray-100"
                            : "hover:bg-purple-50 text-gray-700 hover:text-gray-900"
                        }`}
                        onClick={() => router.push("/pages/dashboard")}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon
                            className={`h-4 w-4 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                          />
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
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-100"
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
                        className={`px-3 py-2 rounded-md hover:cursor-pointer transition-colors duration-300 ${
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
                                className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
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
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-100"
                    : "hover:bg-purple-50 text-gray-900"
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
                        className={`px-3 py-2 rounded-md hover:cursor-pointer transition-colors duration-300 ${
                          isDarkMode
                            ? "hover:bg-gray-800 text-gray-300 hover:text-gray-100"
                            : "hover:bg-purple-50 text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon
                            className={`h-4 w-4 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                            <span
                              className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
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
        className={`border-t transition-colors duration-200 ease-in-out ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
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
                    <span
                      className={`text-sm font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
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
                className={`w-56 transition-colors duration-200 ease-in-out ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <DropdownMenuItem
                  className={`hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-purple-50 text-gray-900"
                  }`}
                  onClick={() => router.push("/pages/account")}
                >
                  <CircleUser className="mr-2 h-4 w-4" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-purple-100 hover:bg-purple-50 text-gray-900"
                  }`}
                  onClick={() => router.push("/pages/billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={showLogoutConfirmation}
                  className={`hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-purple-50 text-gray-900"
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

export default function BillingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const session = useAuth();

  // Mock billing data
  const currentPlan = {
    name: "Pro",
    price: 29,
    billing: "monthly",
    status: "active",
    nextBilling: "2024-02-15",
    features: [
      "100 clips per month",
      "4K export quality",
      "Advanced AI features",
      "Batch processing",
      "Priority support",
      "Custom branding",
    ],
  };

  const usage = {
    clipsUsed: 67,
    clipsLimit: 100,
    tokensUsed: 1200,
    tokensLimit: 2500,
    storageUsed: 2.4,
    storageLimit: 10,
  };

  const paymentHistory = [
    {
      id: "inv_001",
      date: "2024-01-15",
      amount: 29.0,
      status: "paid",
      description: "Pro Plan - Monthly",
      invoice: "INV-2024-001",
    },
    {
      id: "inv_002",
      date: "2023-12-15",
      amount: 29.0,
      status: "paid",
      description: "Pro Plan - Monthly",
      invoice: "INV-2023-012",
    },
    {
      id: "inv_003",
      date: "2023-11-15",
      amount: 29.0,
      status: "paid",
      description: "Pro Plan - Monthly",
      invoice: "INV-2023-011",
    },
    {
      id: "inv_004",
      date: "2023-10-15",
      amount: 29.0,
      status: "failed",
      description: "Pro Plan - Monthly",
      invoice: "INV-2023-010",
    },
  ];

  useEffect(() => {
    if (session === null) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  const handleUpgrade = () => {
    setAlert({ type: "success", message: "Redirecting to upgrade options..." });
  };

  const handleCancelSubscription = () => {
    setAlert({
      type: "warning",
      message:
        "Subscription cancellation initiated. You'll retain access until your next billing date.",
    });
  };

  const handleUpdatePayment = () => {
    setAlert({
      type: "success",
      message: "Payment method update initiated...",
    });
  };

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
        <SidebarInset className="flex-1">
          {/* Header */}
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
                  Billing & Subscription
                </h1>
                <p
                  className={`text-sm transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your subscription, usage, and payment methods
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
                  className={`transition-colors duration-200 ease-in-out ${
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
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Alert */}
              {alert && (
                <Alert
                  className={`transition-colors duration-200 ease-in-out ${
                    alert.type === "success"
                      ? isDarkMode
                        ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700"
                        : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                      : alert.type === "warning"
                        ? isDarkMode
                          ? "bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-700"
                          : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
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
                        : alert.type === "warning"
                          ? isDarkMode
                            ? "text-yellow-300"
                            : "text-yellow-700"
                          : isDarkMode
                            ? "text-red-300"
                            : "text-red-700"
                    }`}
                  >
                    {alert.message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Current Plan & Usage Overview */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Current Plan */}
                <Card
                  className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`flex items-center space-x-2 transition-colors duration-200 ease-in-out ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      <Crown className="h-5 w-5 text-purple-600" />
                      <span>Current Plan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-bold transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {currentPlan.name}
                        </span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          {currentPlan.status}
                        </Badge>
                      </div>
                      <p
                        className={`text-sm transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        ${currentPlan.price}/{currentPlan.billing}
                      </p>
                      <p
                        className={`text-xs transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Next billing:{" "}
                        {new Date(currentPlan.nextBilling).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Clips Usage */}
                <Card
                  className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`flex items-center space-x-2 transition-colors duration-200 ease-in-out ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      <Video className="h-5 w-5 text-purple-600" />
                      <span>Clips Usage</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-bold transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {usage.clipsUsed}
                        </span>
                        <span
                          className={`text-sm transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          of {usage.clipsLimit}
                        </span>
                      </div>
                      <Progress
                        value={(usage.clipsUsed / usage.clipsLimit) * 100}
                        className="h-2"
                      />
                      <p
                        className={`text-xs transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {usage.clipsLimit - usage.clipsUsed} clips remaining
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tokens Usage */}
                <Card
                  className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`flex items-center space-x-2 transition-colors duration-200 ease-in-out ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      <Coins className="h-5 w-5 text-purple-600" />
                      <span>Tokens</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-bold transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {usage.tokensUsed}
                        </span>
                        <span
                          className={`text-sm transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          of {usage.tokensLimit}
                        </span>
                      </div>
                      <Progress
                        value={(usage.tokensUsed / usage.tokensLimit) * 100}
                        className="h-2"
                      />
                      <p
                        className={`text-xs transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {usage.tokensLimit - usage.tokensUsed} tokens remaining
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Storage Usage */}
                <Card
                  className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`flex items-center space-x-2 transition-colors duration-200 ease-in-out ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      <Activity className="h-5 w-5 text-purple-600" />
                      <span>Storage</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-bold transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {usage.storageUsed}GB
                        </span>
                        <span
                          className={`text-sm transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          of {usage.storageLimit}GB
                        </span>
                      </div>
                      <Progress
                        value={(usage.storageUsed / usage.storageLimit) * 100}
                        className="h-2"
                      />
                      <p
                        className={`text-xs transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {usage.storageLimit - usage.storageUsed}GB available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plan Details & Actions */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Plan Features */}
                <Card
                  className={`lg:col-span-2 shadow-sm border transition-colors duration-200 ease-in-out ${
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
                      <Zap className="h-5 w-5 text-purple-600" />
                      <span>Plan Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {currentPlan.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                          <span
                            className={`text-sm transition-colors duration-200 ease-in-out ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
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
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-colors duration-200 ease-in-out"
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                    <Button
                      onClick={handleUpdatePayment}
                      variant="outline"
                      className={`w-full bg-transparent transition-colors duration-200 ease-in-out ${
                        isDarkMode
                          ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                          : "border-purple-200 hover:bg-purple-50 text-gray-700"
                      }`}
                    >
                      <CreditCard
                        className={`h-4 w-4 mr-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      />
                      Update Payment
                    </Button>
                    <Button
                      onClick={handleCancelSubscription}
                      variant="outline"
                      className={`w-full bg-transparent transition-colors duration-200 ease-in-out ${
                        isDarkMode
                          ? "border-red-700 text-red-400 hover:bg-red-900/20"
                          : "border-red-200 text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Subscription
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Payment History */}
              <Card
                className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardHeader>
                  <CardTitle
                    className={`flex items-center justify-between transition-colors duration-200 ease-in-out ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <History className="h-5 w-5 text-purple-600" />
                      <span>Payment History</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`bg-transparent transition-colors duration-200 ease-in-out ${
                        isDarkMode
                          ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                          : "border-purple-200 hover:bg-purple-50 text-gray-700"
                      }`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow
                        className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <TableCell className="font-medium">
                            {new Date(payment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>${payment.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payment.status === "paid"
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-red-100 text-red-700 hover:bg-red-200"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`transition-colors duration-200 ease-in-out ${
                                isDarkMode
                                  ? "text-purple-400 hover:text-purple-300"
                                  : "text-purple-600 hover:text-purple-700"
                              }`}
                            >
                              {payment.invoice}
                              <Download className="h-3 w-3 ml-1" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Billing Information */}
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
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <span>Billing Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4
                        className={`font-medium mb-2 transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        Payment Method
                      </h4>
                      <div
                        className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors duration-200 ease-in-out ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700/50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <CreditCard
                          className={`h-5 w-5 transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-500" : "text-gray-400"
                          }`}
                        />
                        <div>
                          <p
                            className={`text-sm font-medium transition-colors duration-200 ease-in-out ${
                              isDarkMode ? "text-gray-100" : "text-gray-900"
                            }`}
                          >
                            •••• •••• •••• 4242
                          </p>
                          <p
                            className={`text-xs transition-colors duration-200 ease-in-out ${
                              isDarkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            Expires 12/25
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4
                        className={`font-medium mb-2 transition-colors duration-200 ease-in-out ${
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        Billing Address
                      </h4>
                      <div
                        className={`p-3 border rounded-lg transition-colors duration-200 ease-in-out ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700/50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <p
                          className={`text-sm transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          John Doe
                        </p>
                        <p
                          className={`text-sm transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          123 Main Street
                        </p>
                        <p
                          className={`text-sm transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          San Francisco, CA 94105
                        </p>
                        <p
                          className={`text-sm transition-colors duration-200 ease-in-out ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
