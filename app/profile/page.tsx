'use client';
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getDoc, doc, deleteDoc, updateDoc, DocumentData } from "firebase/firestore";
import { auth, db, storage } from "@/lib/firebase";
import { Button } from "../components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Star, Heart, Settings, Package, LogOut } from "lucide-react";
import Image from "next/image";
import { useFavStore } from "@/store/useFavStore";
import ProductDisplayCard from "../components/common/ProductCard";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Link from "next/link";
export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"profile" | "orders" | "favourites" | "settings">("profile");
    const favs = useFavStore((state) => state.favourites)
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<DocumentData>();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        profilePhoto: "",
        orders: [],
    });
    const [loading, setLoading] = useState(false)

    const fetchUserData = async (uid: string) => {
        try {
            const docSnap = await getDoc(doc(db, "users", uid));
            if (docSnap.exists()) {
                const data = docSnap.data()
                setUserData(data);
                setFormData({
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone ? data.phone : "",
                    address: data.address ? data.address : "",
                    profilePhoto: data.profilePhoto ? data.profilePhoto : "",
                    orders: data.orders ? data.orders : [],
                })
            } else {
                console.log("No such user!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/login");
            } else {
                setUser(currentUser);
                fetchUserData(currentUser.uid);
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (!user) return;

    if (!userData) {
        return <div className="flex h-[100%] flex-col items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#E5A000]"></div>
  <p className="mt-2 text-gray-700">Loading...</p>
  </div>
    }

    const handleUnsubscribe = async () => {
        if (!user) return;

        try {
            // 🧹 Delete user document from Firestore
            await deleteDoc(doc(db, "users", user.uid));

            // 📩 Call your unsubscribe API (optional)
            await fetch("/api/unsubscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email }),
            });

            // ⚠️ Reauthenticate before deleting account (Firebase requirement)
            const password = prompt("Please confirm your password to delete your account:");
            if (!password) {
                toast.error("Password required for verification.");
                return;
            }

            const credential = EmailAuthProvider.credential(user.email!, password);
            await reauthenticateWithCredential(user, credential);

            // 🗑️ Delete the user from Firebase Authentication
            await deleteUser(user);

            toast.success("Your account has been deleted successfully.");
        } catch (error) {
            console.error("Error unsubscribing:", error);
            toast.error("Something went wrong while deleting your account.");
        }
    };
    const handleDelete = () => {
        console.log('deleting....');
        toast(
            ({ closeToast }) => (
                <div>
                    <p className="mb-2">
                        Are you sure? You may miss out on updates and discounts.
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                handleUnsubscribe()
                                console.log("User confirmed");
                                closeToast();
                            }}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Yes, I’m sure
                        </button>
                        <button
                            onClick={closeToast}
                            className="bg-gray-300 text-black px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false, // stay open until user acts
                closeOnClick: false,
                draggable: false,
                theme: "light",
            }
        );

    }

    const handleLogout = () => {
        signOut(auth)
        console.log("User logged out");
    };

    const handleUpload = async (e: React.FormEvent, image: File) => {
        e.preventDefault();

        try {
            toast.info("uploading...");
            const fileName = `${uuidv4()}-${image.name}`;
            const storageRef = ref(storage, `products/${user.uid}/${fileName}`);
            await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(storageRef);
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, "profilePhoto", downloadURL);
            fetchUserData(user.uid);
        } catch (err) {
            console.log(err);
            toast.error("An error occurred. Please try again")
        }


    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        if (!formData.fullName || !formData.email) {
            toast.error("Atleast name and email are required");
            return
        }

        try {
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, formData);
        } catch (err) {
            toast.error("An unexpected error occurred. Please try again");
            console.log(err)
        } finally {
            setLoading(false)
        }


    }

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <aside className="bg-white rounded-2xl p-6 shadow flex flex-col space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="h-full flex items-center justify-center">
                            {formData.profilePhoto ?
                                <Image
                                    src={formData.profilePhoto}
                                    alt="profile"
                                    width={50}
                                    height={50}
                                    className="rounded-full w-auto h-auto object-cover"
                                /> :
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="rounded-full border h-full"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleUpload(e, file); // or handleUpload(file)
                                        }
                                    }}
                                />

                            }
                        </div>


                        <div>
                            <h2 className="font-semibold text-lg">{userData?.fullName}</h2>
                            <p className="text-gray-500 text-sm">Member since {new Date(userData?.createdAt).getFullYear()}</p>
                        </div>
                    </div>

                    <Button
                        variant={activeTab === "profile" ? "default" : "ghost"}
                        onClick={() => setActiveTab("profile")}
                        className="justify-start"
                    >
                        <Star className="w-4 h-4 mr-2" /> Profile
                    </Button>

                    <Button
                        variant={activeTab === "orders" ? "default" : "ghost"}
                        onClick={() => setActiveTab("orders")}
                        className="justify-start"
                    >
                        <Package className="w-4 h-4 mr-2" /> Orders
                    </Button>

                    <Button
                        variant={activeTab === "favourites" ? "default" : "ghost"}
                        onClick={() => setActiveTab("favourites")}
                        className="justify-start"
                    >
                        <Heart className="w-4 h-4 mr-2" /> Favourites
                    </Button>

                    <Button
                        variant={activeTab === "settings" ? "default" : "ghost"}
                        onClick={() => setActiveTab("settings")}
                        className="justify-start"
                    >
                        <Settings className="w-4 h-4 mr-2" /> Settings
                    </Button>

                    <Button variant="destructive" onClick={handleLogout} className="justify-start mt-6">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </aside>

                {/* Main Content */}
                <section className="col-span-3 bg-white rounded-2xl p-6 shadow transition-all duration-300">
                    {activeTab === "profile" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Full Name</Label>
                                    <Input type="text" value={userData?.fullName} name="fullName" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input type="email" value={userData?.email} name="email" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input type="tel" value={userData?.phone} name="phone" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                                </div>
                                <div>
                                    <Label>Address</Label>
                                    <Input type="text" value={userData?.address} name="address" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                                </div>
                                <Button className="mt-4 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "orders" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">My Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {
                                    !formData.orders.length &&
                                    <p className="text-gray-500 text-sm">You haven’t placed any orders yet.</p>
                                }

                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "favourites" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">My Favourites</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {favs.map((item, index) => (
                                    <ProductDisplayCard product={item.product} key={index} />
                                ))}

                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "settings" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button variant="secondary" className="w-full">
                                    <Link href="/forgot-password">Change Password</Link>
                                </Button>
                                <Button variant="destructive" className="w-full" onClick={handleDelete}>
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </section>
            </div>
        </main>
    );
}
