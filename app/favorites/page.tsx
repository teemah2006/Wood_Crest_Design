"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFavStore } from "@/store/useFavStore"; // your zustand store
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import cards from "@/public/assets/Group 15.png";
import ProductDisplayCard from "../components/common/ProductCard";
export default function FavoritesPage() {
    const router = useRouter();
    const { favourites } = useFavStore();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // 🧕 CASE 1: Not signed in
    if (!user) {
        return (
            <>
                <h2 className="text-[#E5A000] my-6 text-2xl md:text-3xl font-semibold text-center">Your Favourites</h2>

                <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <Image
                    src={cards} // optional illustration
                    alt="Empty Favorites"
                    width={200}
                    height={200}
                    className="mb-6"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Sign in to view your saved items
                </h2>
                <p className="text-gray-500 mb-6 max-w-md">
                    You need to be logged in to see your favorite products.
                </p>
                <Button  onClick={() => router.push("/login")}>Sign In</Button>
            </div>
            </>
        );
    }

    // 📭 CASE 2: Signed in but no favorites
    if (favourites.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <Image
                    src={cards} // optional illustration
                    alt="Empty Favorites"
                    width={200}
                    height={200}
                    className="mb-6"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Your favorites list is empty
                </h2>
                <p className="text-gray-500 mb-6 max-w-md">
                    Browse through our collection and tap the ❤️ icon on a product to save
                    it for later.
                </p>
                <Button variant="secondary" onClick={() => router.push("/products")}>Start Shopping</Button>
            </div>
        );
    }

    // 💛 CASE 3: Signed in and has favorites
    return (
        <div className="min-h-screen p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Your Favorites ({favourites.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favourites.map((fav: any, index) => (
                    <ProductDisplayCard product={fav.product} key={index}/>
                ))}
            </div>
        </div>
    );
}
