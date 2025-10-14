'use client';

import React, { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useFavStore } from "@/store/useFavStore";
import { toast } from "react-toastify";
const RegisterPage: React.FC = () => {
  const router = useRouter();
  const favs = useFavStore((state) => state.favourites);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) return setError("Please enter your full name");
    if (!formData.email.trim()) return setError("Please enter your email");
    if (!formData.password.trim()) return setError("Please enter your password");
    if (formData.password.length < 6)
      return setError("Password should be at least 6 characters");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match");

    setError("");
    setLoading(true);

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Store extra user info in Firestore
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        role: "customer",
        favorites: favs.length ? favs : [],
        createdAt: new Date().toISOString(),
      });

      // Send confirmation (not verification)
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          subject: "Welcome to WoodCrest Designs!",
          name: formData.fullName,
        }),
      });

      toast.success('Account created successfully');

      router.push("/login");
    } catch{
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full flex flex-col justify-center items-center min-h-screen p-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-[#E5A000] text-center my-4">
        CREATE AN ACCOUNT
      </h2>
      <p className="text-gray-800 md:text-lg lg:text-xl text-center mb-6">
        Join our community of elegant furniture lovers
      </p>

      <form onSubmit={handleSignup} className="w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="my-4">
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="my-4">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="my-4">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="my-4">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <Button
          variant="default"
          size="lg"
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
