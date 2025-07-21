import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "clipfarm.ai - Create Viral Clips with AI",
  description:
    "Transform your long-form content into engaging short clips automatically with AI. Perfect for social media, marketing, and content creators.",
  keywords: "AI video editing, clip creation, social media content, video clips, content creation",
  openGraph: {
    title: "clipfarm.ai - Create Viral Clips with AI",
    description: "Transform your long-form content into engaging short clips automatically with AI.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
