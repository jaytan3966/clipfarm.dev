"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/authContext";
import { DarkModeProvider } from "@/context/darkModeContext";
import { UserProfileProvider } from "@/context/userProfileContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <UserProfileProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </UserProfileProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}
