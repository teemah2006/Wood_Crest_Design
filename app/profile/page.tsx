'use client';
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "../components/ui/button";
export default function UserProfile(){
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        
        // toast.error("User not authenticated")
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return ;


    return(
        <div>
            This is the user&apos;s profile page.
            <Button variant="secondary" onClick={() => signOut(auth)} >Sign Out</Button>
        </div>
    )
}