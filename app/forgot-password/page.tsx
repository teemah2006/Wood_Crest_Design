'use client';

import React, { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A password reset link has been sent to your email.");
      setEmail("");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        console.log(err);
        setError("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-2">
        Forgot Password?
      </h2>
      <p className="text-gray-700 mb-8 text-center max-w-sm">
        Enter your email below, and we’ll send you a link to reset your password.
      </p>

      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-md border border-gray-200 p-6 rounded-lg shadow-sm bg-white"
      >
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Label>Email Address</Label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <Button
          type="submit"
          className="w-full bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#F5F5F5]"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
     <Link href="/login" className="flex w-full max-w-md text-left my-4"> <ChevronLeft/>Back to Sign in</Link>
    </div>
  );
};

export default ForgotPasswordPage;
