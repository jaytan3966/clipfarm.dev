"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Scissors, Mail, Lock, User, Eye, EyeOff, Ban } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const username = formData.username;
    const email = formData.email;

    const { data, error: authError } = isSignUp
      ? await supabase.auth.signUp({
          email: email,
          password: formData.password,
          options: {
            data: {
              name: username,
            },
          },
        })
      : await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    if (isSignUp) {
      const response = await fetch("/api/supabase-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: data.user?.id,
          username: username.trim(),
          email: email.toLowerCase().trim(),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during sign up.");
        setLoading(false);
        return;
      }
      setError("Check your email for the confirmation link!");
      setLoading(false);
      return;
    }

    onOpenChange(false);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-950">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              clipfarm.dev
            </span>
          </div>

          <div className="relative mb-6">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <div
                className={`absolute top-1 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md transition-all duration-300 ease-in-out ${
                  isSignUp
                    ? "left-1/2 w-[calc(50%-4px)]"
                    : "left-1 w-[calc(50%-4px)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300 ${
                  !isSignUp ? "text-white" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300 ${
                  isSignUp ? "text-white" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold">
            {isSignUp ? "Create your account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Start creating viral clips with AI in seconds"
              : "Sign in to continue to clipfarm.dev"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={
                  isSignUp ? "Create a password" : "Enter your password"
                }
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
                ? "Create Account"
                : "Sign In"}
          </Button>
        </form>

        {error && (
          <Alert className="bg-gradient-to-r from-red-400 to-pink-400 rounded-lg">
            <Ban className="h-4 w-4" />
            <AlertTitle className="font-medium text-white">
              {isSignUp ? "SIGN UP ERROR!" : "LOGIN ERROR!"}
            </AlertTitle>
            <AlertDescription className="text-sm text-white mt-1">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
