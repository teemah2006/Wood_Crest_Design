import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text(); // Pesapal sometimes sends plain text, not JSON
    const data = JSON.parse(body);

    const { order_tracking_id, order_merchant_reference } = data;

    // Step 1: Confirm payment status with Pesapal
    const tokenRes = await fetch(`${process.env.PESAPAL_BASE_URL}/Auth/RequestToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PESAPAL_CONSUMER_SECRET}`,
      },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      }),
    });
    const { token } = await tokenRes.json();

    const statusRes = await fetch(`${process.env.PESAPAL_BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${order_tracking_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const statusData = await statusRes.json();
    console.log("Payment status:", statusData);

    // Step 2: Update your Firestore orders collection
    // Example:
    
    await updateDoc(doc(db, "orders", order_merchant_reference), {
      paymentStatus: statusData.payment_status_description,
      transactionId: order_tracking_id,
      updatedAt: new Date().toISOString(),
    });
    

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling IPN:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
