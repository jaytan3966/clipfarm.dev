"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/authContext"
import { useUserProfile } from "@/context/userProfileContext"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  RefreshCw,
  Check,
  X,
} from "lucide-react"

function AppSidebar() {
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
    <Sidebar className="border-r border-purple-200 bg-white shadow-sm hover:cursor-pointer">
      <SidebarHeader className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center space-x-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Scissors className="h-4 w-4 text-white" />
          </div>
          <span
            className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => router.push("/pages/dashboard")}
          >
            clipfarm.ai
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
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-purple-50 rounded-lg px-3 py-2 text-gray-900 hover:cursor-pointer duration-500">
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Past Clips</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${openSections.pastClips ? "rotate-180" : ""}`}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {pastClipsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="flex items-center justify-between hover:bg-purple-50 hover:cursor-pointer text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md duration-500"
                        onClick={() => router.push("/dashboard")}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4 text-gray-500" />
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
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-purple-50 rounded-lg px-3 py-2 text-gray-900 hover:cursor-pointer duration-500">
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Tokens & Payments</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${openSections.tokens ? "rotate-180" : ""}`}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {tokenItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={`hover:bg-purple-50 px-3 py-2 rounded-md hover:cursor-pointer duration-500 ${item.action ? "text-purple-600 hover:text-purple-700" : "text-gray-700 hover:text-gray-900"}`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{item.title}</span>
                            {item.value && <span className="text-xs text-gray-500">{item.value}</span>}
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
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-purple-50 rounded-lg px-3 py-2 text-gray-900 hover:cursor-pointer duration-500">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Generate Clips</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${openSections.generate ? "rotate-180" : ""}`}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {generateItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="hover:bg-purple-50 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:cursor-pointer duration-500">
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{item.title}</span>
                            <span className="text-xs text-gray-500">{item.description}</span>
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

      <SidebarFooter className="border-t border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full hover:bg-purple-100 px-3 py-2 rounded-lg">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="bg-purple-500 text-white text-xs">
                      {user ? user.username[0].toUpperCase() : "0"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left hover:cursor-pointer">
                    <span className="text-sm font-medium text-gray-900">{user ? user.username : "null"}</span>
                    <span className="text-xs text-purple-600 font-medium">Pro Plan</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 text-gray-900">
                <DropdownMenuItem
                  className="hover:bg-purple-50 hover:cursor-pointer duration-500"
                  onClick={() => router.push("/pages/account")}
                >
                  <CircleUser className="mr-2 h-4 w-4" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-purple-50 hover:cursor-pointer duration-500 bg-purple-100"
                  onClick={() => router.push("/pages/billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="hover:bg-purple-50 hover:cursor-pointer duration-500"
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

export default function BillingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState<{ type: "success" | "error" | "warning"; message: string } | null>(null)

  const session = useAuth()
  const user = useUserProfile()

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
  }

  const usage = {
    clipsUsed: 67,
    clipsLimit: 100,
    tokensUsed: 1200,
    tokensLimit: 2500,
    storageUsed: 2.4,
    storageLimit: 10,
  }

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
  ]

  useEffect(() => {
    if (session === null) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [session, router])

  const handleUpgrade = () => {
    setAlert({ type: "success", message: "Redirecting to upgrade options..." })
  }

  const handleCancelSubscription = () => {
    setAlert({
      type: "warning",
      message: "Subscription cancellation initiated. You'll retain access until your next billing date.",
    })
  }

  const handleUpdatePayment = () => {
    setAlert({ type: "success", message: "Payment method update initiated..." })
  }

  if (isLoading) return null

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-purple-200 bg-white/90 backdrop-blur-sm px-6 shadow-sm">
            <SidebarTrigger className="-ml-1 w-8 h-8 text-gray-600 hover:text-gray-900 hover:cursor-pointer duration-500" />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Billing & Subscription</h1>
                <p className="text-sm text-gray-600">Manage your subscription, usage, and payment methods</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 duration-500">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 duration-500">
                  <RefreshCw className="h-4 w-4" />
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
                  className={`${
                    alert.type === "success"
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                      : alert.type === "warning"
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                        : "bg-gradient-to-r from-red-50 to-pink-50 border-red-300"
                  }`}
                >
                  <AlertDescription
                    className={`${
                      alert.type === "success"
                        ? "text-green-700"
                        : alert.type === "warning"
                          ? "text-yellow-700"
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
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-purple-600" />
                      <span>Current Plan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{currentPlan.name}</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">{currentPlan.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        ${currentPlan.price}/{currentPlan.billing}
                      </p>
                      <p className="text-xs text-gray-500">
                        Next billing: {new Date(currentPlan.nextBilling).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Clips Usage */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                      <Video className="h-5 w-5 text-purple-600" />
                      <span>Clips Usage</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{usage.clipsUsed}</span>
                        <span className="text-sm text-gray-500">of {usage.clipsLimit}</span>
                      </div>
                      <Progress value={(usage.clipsUsed / usage.clipsLimit) * 100} className="h-2" />
                      <p className="text-xs text-gray-500">{usage.clipsLimit - usage.clipsUsed} clips remaining</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tokens Usage */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                      <Coins className="h-5 w-5 text-purple-600" />
                      <span>Tokens</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{usage.tokensUsed}</span>
                        <span className="text-sm text-gray-500">of {usage.tokensLimit}</span>
                      </div>
                      <Progress value={(usage.tokensUsed / usage.tokensLimit) * 100} className="h-2" />
                      <p className="text-xs text-gray-500">{usage.tokensLimit - usage.tokensUsed} tokens remaining</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Storage Usage */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      <span>Storage</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{usage.storageUsed}GB</span>
                        <span className="text-sm text-gray-500">of {usage.storageLimit}GB</span>
                      </div>
                      <Progress value={(usage.storageUsed / usage.storageLimit) * 100} className="h-2" />
                      <p className="text-xs text-gray-500">{usage.storageLimit - usage.storageUsed}GB available</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plan Details & Actions */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Plan Features */}
                <Card className="lg:col-span-2 bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <span>Plan Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                    <Button
                      onClick={handleUpdatePayment}
                      variant="outline"
                      className="w-full border-purple-200 hover:bg-purple-50 bg-transparent text-gray-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2 text-gray-700"/>
                      Update Payment
                    </Button>
                    <Button
                      onClick={handleCancelSubscription}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2 " />
                      Cancel Subscription
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Payment History */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <History className="h-5 w-5 text-purple-600" />
                      <span>Payment History</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="text-gray-700">
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id} className="text-gray-700">
                          <TableCell className="font-medium">{new Date(payment.date).toLocaleDateString()}</TableCell>
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
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
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
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <span>Billing Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Billing Address</h4>
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-600">123 Main Street</p>
                        <p className="text-sm text-gray-600">San Francisco, CA 94105</p>
                        <p className="text-sm text-gray-600">United States</p>
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
  )
}
