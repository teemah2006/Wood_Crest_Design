'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button } from '@/app/components/ui/button';

import { v4 as uuidv4 } from "uuid";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.total());
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [iframeUrl, setIframeUrl] = useState('')
  // Step 1: Check Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  // Step 2: Empty cart
  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  // Step 3: Missing profile info
  if (!userData?.phone || !userData?.address) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Please complete your profile to continue checkout.</p>
        <Button onClick={() => router.push('/profile')}>Go to Profile</Button>
      </div>
    );
  }

  // Step 4: Proceed to payment

  const handlePay = async () => {

    const tokenRes = await fetch("/api/pesapal/token");
    const tokenData = await tokenRes.json();
    const token = tokenData.token;

    const orderId = uuidv4();

    await setDoc(doc(db, "orders", orderId), {
      userId: user.uid,
      products: cart,
      amount: total,
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString(),
    });


    const res = await fetch('/api/pesapal/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token,
        orderId: orderId,
        amount: total,
        email: user.email,
        phoneNumber: userData.phone,
        name: userData.fullName,
        address: userData.address,
        cartItems: cart
      }),
    });
    const data = await res.json();
    console.log(data)
    setIframeUrl(data.redirect_url); // or open in iframe
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Checkout</h2>

      <div className="border p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Billing Info</h3>
        <p><b>Name:</b> {userData.fullName}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {userData.phone}</p>
        <p><b>Address:</b> {userData.address}</p>
      </div>

      <div className="border p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Order Summary</h3>
        {cart.map((item) => (
          <div key={item.product.id} className="flex justify-between py-2">
            <span>{item.product.name}</span>
            <span>{item.product.price * item.quantity} RF</span>
          </div>
        ))}
        <div className="font-semibold mt-3">Total: {total} RF</div>
      </div>

      {!iframeUrl ? (
        <Button onClick={handlePay} className=" text-white p-3 rounded">
          Proceed to Payment
        </Button>
      ) : (
        <iframe
          src={iframeUrl}
          width="100%"
          height="600"
          className="rounded-xl border"
          allow="payment"
        />
      )}
    </div>
  );
}



