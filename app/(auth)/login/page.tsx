'use client'
import React from "react";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email.trim()) {
      setError("please enter your email");
      return
    }
    if (!formData.password.trim()) {
      setError("please enter your password");
      return
    }

    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/profile')
     
    } catch{
      setError('Invalid credentials, try again.')
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="bg-white w-full flex flex-col justify-center items-center min-h-screen ">
      <h2 className="tex-xl md:text-2xl lg:text-3xl text-[#E5A000] text-center my-4">WELCOME BACK</h2>
      <p className="text-gray-800 md:text-lg lg:text-xl">Sign in to your customer account</p>

      <div className="p-6 w-[500px]">

      
      {/* login form */}
      <form onSubmit={handleSignin}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="my-6">
          <Label>Email</Label>
          <Input type="email" placeholder="example@gmail.com" value={formData.email} name="email"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="">
          <Label>Password</Label>
          <Input type="password" value={formData.password} name="password"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>
        <Button className="my-6 w-full" variant="default" size="lg" type="submit" disabled={loading}>Sign In</Button>

      </form>
      <div className="flex justify-between">
        <Link href="/forgot-password" className="underline">Forgot Password?</Link>
        <Link href="/register" className="flex">Register <ChevronRight/></Link>
      </div>
</div>
    </div>
  );
};

export default LoginPage;