"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function AuthPage({ type }: { type: "SIGN_IN" | "SIGN_UP" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignIn = type === "SIGN_IN";

  const handleSubmit = async () => {
    setIsLoading(true);

    // simulate request
    await new Promise((res) => setTimeout(res, 1500));

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm md:max-w-md lg:max-w-lg"
      >
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 space-y-6 md:p-8 lg:p-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-center">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>

            {/* Full Name - only for Sign Up */}
            {!isSignIn && (
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <Button
              className="w-full rounded-xl mt-4 text-base md:text-lg py-6 md:py-7"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>

            {/* CTA */}
            <p className="text-center text-sm md:text-base text-muted-foreground mt-2">
              {isSignIn ? "Don't have any account? " : "Already have an account? "}
              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="font-bold text-primary underline"
              >
                {isSignIn ? "Create an Account" : "Sign In"}
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
