"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Filter,
  Trash,
  LogOut,
  CircleUser
} from "lucide-react"

function AppSidebar() {

  const router = useRouter();
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      router.push('/')
    }
  }

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
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" onClick={(() => router.push("/"))}>
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
                      <SidebarMenuButton className="flex items-center justify-between hover:bg-purple-50 hover:cursor-pointer text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md duration-500">
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{item.title}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 duration-500"
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
                    <AvatarFallback className="bg-purple-500 text-white text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left hover:cursor-pointer">
                    <span className="text-sm font-medium text-gray-900">John Doe</span>
                    <span className="text-xs text-purple-600 font-medium">Pro Plan</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 text-gray-900">
                <DropdownMenuItem className="hover:bg-purple-50 hover:cursor-pointer duration-500">
                  <CircleUser className="mr-2 h-4 w-4"/>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-50 hover:cursor-pointer duration-500">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-50 hover:cursor-pointer duration-500">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()} className="hover:bg-purple-50 hover:cursor-pointer duration-500">
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

export default function Dashboard() {
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
  ]
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    };

    verifyUser();
  })

  if (isLoading) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-purple-200 bg-white/90 backdrop-blur-sm px-6 shadow-sm">
            <SidebarTrigger className="-ml-1 w-8 h-8 text-gray-900 hover:cursor-pointer" />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your clips and generate new content</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Your Clips</h2>
              <p className="text-gray-600">Create new clips or manage your existing ones</p>
            </div>

            {/* Clips Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Create New Clip Card */}
              <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">Create New Clip</h3>
                  <p className="text-sm text-gray-600">Upload a video and let AI create engaging clips</p>
                </CardContent>
              </Card>

              {/* Past Clips */}
              {pastClips.map((clip) => (
                <Card
                  key={clip.id}
                  className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 pt-0"
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
                            className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm duration-500"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black/60 text-white backdrop-blur-sm">
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
                  <CardContent>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900">{clip.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span className="font-medium">{clip.platform}</span>
                      <span>{clip.created}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Eye className="h-3 w-3" />
                      <span className="font-medium">{clip.views.toLocaleString()} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
