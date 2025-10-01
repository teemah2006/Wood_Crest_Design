"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
import AddProductForm from "@/app/components/features/product-form";
import Button from "@/app/components/common/Button";
import ProductList from "@/app/components/features/product-list";
import { toast } from "react-toastify";
export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        
        toast.error("User not authenticated")
        router.push("/admin/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return ;

  return (
    <div className="p-6">
      <header>
        <div className="flex justify-between items-center mb-6 h-auto">
          <h1 className="text-3xl font-semibold mb-6">Welcome, Admin</h1>
          {/* <nav>
          <span className="mr-4 text-gray-600">Logged in as: {user.email}</span>
          
          </nav> */}
      <Button size="small" shape="rounded-md" type="button" color="gray" text="Sign Out" onClick={() => signOut(auth)} />
        </div>
      </header>
      <div className="mt-8 w-full">
        <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold md:text-2xl">Uploaded Products</h2>
        <Button size="small" shape="rounded-md" type="button" color="black" text={showForm? 'Cancel' : 'Upload'} onClick={() => setShowForm(!showForm)} />
        </div>

        {showForm && (
        <AddProductForm onSuccess={() => {
          setRefreshKey(k => k + 1);
          setShowForm(false); // Optionally close the form after success
        }} />
      )}
        <ProductList key={refreshKey}/>
      
      </div>
      
    </div>
  );
}
