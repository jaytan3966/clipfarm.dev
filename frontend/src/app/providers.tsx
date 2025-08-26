"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/authContext"
import { UserProfileProvider } from "@/context/userProfileContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <UserProfileProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </UserProfileProvider>
    </AuthProvider>
  )
}
