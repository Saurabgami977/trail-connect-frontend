"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mountain, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signin } from "@/api/routes/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { store } from "@/store/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutate: loginFunc, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: signin,
    onSuccess: (data) => {
      router.push("/");
      store.dispatch({
        type: "auth/login",
        payload: data,
      });
      toast.success("Login successful!");
    },
    onError: (error: any) => {
      store.dispatch({
        type: "auth/login",
        payload: { isAuthenticated: false, user: null },
      });
      console.error("Login failed:", error);
      toast.error(
        error?.response.data.message || "Login failed. Please try again."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginFunc({ email, password });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16 min-h-[calc(100vh-200px)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-2xl mb-2">
                <Mountain className="h-8 w-8" />
                <span>Nepal Trek Guide</span>
              </div>
              <p className="text-muted-foreground">
                Welcome back! Sign in to your account.
              </p>
            </div>

            <Card>
              <CardHeader>
                <Tabs defaultValue="tourist" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tourist">Traveller</TabsTrigger>
                    <TabsTrigger value="guide">Guide</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tourist" className="mt-6">
                    <CardTitle>Traveller Login</CardTitle>
                    <CardDescription>
                      Access your bookings and find guides.
                    </CardDescription>
                  </TabsContent>

                  <TabsContent value="guide" className="mt-6">
                    <CardTitle>Guide Login</CardTitle>
                    <CardDescription>
                      Manage your profile, calendar, and bookings.
                    </CardDescription>
                  </TabsContent>
                </Tabs>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-border"
                      />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-primary font-medium hover:underline"
                    >
                      Register now
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
