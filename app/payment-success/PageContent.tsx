"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {CircleCheckBig, CircleX, RotateCcw} from "lucide-react";
import Link from "next/link";
export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    const verifyPayment = async () => {
      const res = await fetch(`/api/pesapal/verify?orderTrackingId=${orderTrackingId}`);
      const data = await res.json();

      if (data.payment_status_description === "Completed") {
        setStatus("success");
      } else {
        setStatus("Fail");
      }
    };

    if (orderTrackingId) verifyPayment();
  }, [orderTrackingId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Payment Status</h1>
      {
        status === "Loading" &&
        <div className="flex h-[100%] flex-col items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#E5A000]"></div>
  <p className="mt-2 text-gray-700">Checking Payment Status...</p>
  </div>
      }
      {status=== "Completed" &&
      <div className="flex flex-col space-y-4">
        <CircleCheckBig className="w-16 h-16 text-green-600" />
        <p> Payment Successful! Thank you for your purchase.</p>
      </div>
      }
      {
        status === "Fail" &&
        <div className="flex flex-col space-y-4">
        <CircleX className="w-16 h-16 text-red-600" />
        <p> Payment not completed or failed.</p>
        <Link href="/checkout" className="flex sapce-x-2">Retry <RotateCcw/></Link>
      </div>
      }
    </div>
  );
}
