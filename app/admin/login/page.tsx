"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";



// console.log("Firebase project ID:", db.app.options.projectId);
export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError("");
        if (email.trim() === "fatimaholadipo4@gmail.com" || password.trim() === process.env.NEXT_PUBLIC_ADMIN_PASS) {
            setLoading(true);
            try {
                 await signInWithEmailAndPassword(auth, email, password);
                // const user = userCredential.user;
                // Optionally, you can set user role in Firestore if not already set
                // await setDoc(doc(db, "users", user.uid), {
                //     email: user.email,
                //     role: "admin", // change to "customer" for normal users
                //     createdAt: new Date(),
                // });
                router.push("/admin/dashboard"); // redirect on success
            } catch {
                setError("Invalid credentials. Try again.");
            } finally {
                setLoading(false);
            }

        } else {
            setError("Invalid credentials. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="border rounded w-full p-2 mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border rounded w-full p-2 mb-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button disabled={loading} className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}
