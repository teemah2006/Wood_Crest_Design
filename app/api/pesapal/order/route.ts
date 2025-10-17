import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token,orderId, amount,
        email,
        phoneNumber,
        name, address, cartItems } = await req.json();

        const description = cartItems
    ?.map((item: any) => `${item.quantity} x ${item.name}`)
    .join(", ") || "Order from MyStore";

    



  const orderPayload = {
    id: orderId,
    currency: "RWF",
    description,
    amount: amount,
    callback_url: process.env.PESAPAL_CALLBACK_URL,
    notification_id: process.env.PESAPAL_NOTIFICATION_ID,
    billing_address: {
      email_address: email,
      phone_number: phoneNumber,
      first_name: name,
      line_1: address || "Kigali",
    },
  };

  const res = await fetch(`${process.env.PESAPAL_BASE_URL}/Transactions/SubmitOrderRequest`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderPayload),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
