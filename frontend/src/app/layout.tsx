// app/layout.tsx (server component, no "use client")
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"   // 👈 wrapper for client providers

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "clipfarm.dev - Create Viral Clips with AI",
  description:
    "Transform your long-form content into engaging short clips automatically with AI.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
