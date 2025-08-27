"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/login/auth-modal"
import {
  CheckCircle,
  ChevronRight,
  Play,
  Scissors,
  Sparkles,
  Zap,
  Clock,
  Users,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
} from "lucide-react"
import { useAuth } from "@/context/authContext"


export default function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const router = useRouter();

  const session = useAuth();
  
  const handleGetStarted = () => {
    if (!session){
      setAuthModalOpen(true);
    } else {
      router.push("/pages/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-slate-900 shadow-lg">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto px-4 md:px-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="#hero" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Scissors className="h-4 w-4 text-white" />
              </div>
              <span className="inline-block font-bold text-xl text-white">clipfarm.dev</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-slate-300 transition-colors hover:text-white duration-500"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="flex items-center text-sm font-medium text-slate-300 transition-colors hover:text-white duration-500"
              >
                Pricing
              </Link>
              <Link
                href="#cta"
                className="flex items-center text-sm font-medium text-slate-300 transition-colors hover:text-white duration-500"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:cursor-pointer duration-500"
                onClick={handleGetStarted}
              >
                Get Started For Free
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section
          id="hero"
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen flex items-center"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-700">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI-Powered Video Clips
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Create viral clips in seconds with AI
                  </h1>
                  <p className="max-w-[98vw] text-gray-500 md:text-xl">
                    Transform your long-form content into engaging short clips automatically. Perfect for social media,
                    marketing, and content creators who want to maximize their reach.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row items-center just">
                   <Button
                    size="lg"
                    className="gap-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 duration-500 hover:cursor-pointer"
                    onClick={handleGetStarted}
                  >
                    Start Creating For Free <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-1 bg-transparent text-gray-500 hover:bg-gray-800 hover:text-white duration-500 hover:cursor-pointer">
                    <Play className="h-4 w-4 " />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <div className="text-gray-500">No credit card required</div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <div className="text-gray-500">Free 7-day trial</div>
                    
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur-xl opacity-30"></div>
                <Image
                  src="/cat-space.gif?height=550&width=550"
                  width={550}
                  height={550}
                  alt="ClipFarm.dev Dashboard"
                  className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl sm:w-full lg:order-last"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex items-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm text-white">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful AI-driven features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Everything you need to create, edit, and optimize video clips for maximum engagement across all
                  platforms.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 xl:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow duration-500">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI Auto-Clipping</h3>
                <p className="text-center text-muted-foreground">
                  Automatically identify and extract the most engaging moments from your Twitch VODs using advanced
                  analytics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow duration-500">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Smart Editing</h3>
                <p className="text-center text-muted-foreground">
                  Add captions, transitions, and effects automatically. Our AI understands context to enhance your clips
                  perfectly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow duration-500">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Batch Processing</h3>
                <p className="text-center text-muted-foreground">
                  Process multiple videos simultaneously and create dozens of clips in minutes, not hours.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow duration-500">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Multi-Platform Export</h3>
                <p className="text-center text-muted-foreground">
                  Optimize clips for TikTok, Instagram, YouTube Shorts, and more with platform-specific formatting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted min-h-screen flex items-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm text-white">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose your plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Start free and scale as you grow. All plans include our core AI features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-purple-500 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                    For Casuals
                  </div>
                  <h3 className="text-2xl font-bold">Hobby</h3>
                  <p className="text-muted-foreground">Perfect for trying out clipfarm.dev</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>10 clips per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>720p export quality</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic AI features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Community support</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-transparent hover:cursor-pointer duration-500" variant="outline" onClick={handleGetStarted}>
                  Get Started For Free
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm ring-2 ring-purple-500">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-purple-500 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-muted-foreground">For content creators and small teams</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>100 clips per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>4K export quality</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced AI features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Batch processing</span>
                  </li>
                 
                </ul>
                <Button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:cursor-pointer duration-500"
                onClick={handleGetStarted}>
                  Start Pro Trial
                </Button>
              </div>
              
            </div>
          </div>
        </section>
        <section id="cta">
        <div
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen flex items-center"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid items-center justify-center gap-4 text-center">
              <div className="space-y-3 text-gray-500">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to create viral clips?</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of content creators who are already using clipfarm.dev to grow their audience and
                  engagement.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button
                    size="lg"
                    className="gap-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 duration-500 hover:cursor-pointer"
                    onClick={handleGetStarted}
                  >
                    Start Creating For Free <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-1 bg-transparent text-gray-500 hover:bg-gray-800 hover:text-white duration-500 hover:cursor-pointer">
                    <Play className="h-4 w-4 " />
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
         <footer className="w-full border-t bg-background">
        <div className="container py-10 mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Scissors className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl">clipfarm.dev</span>
              </div>
              <p className="text-sm max-w-xs text-muted-foreground">
                Create viral clips in seconds with AI-powered video editing and optimization.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground duration-500">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-foreground duration-500">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground duration-500">
                    About
                  </Link>
                </li>

              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground duration-500">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} clipfarm.dev. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </section>
      </main>

     <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  )
}
