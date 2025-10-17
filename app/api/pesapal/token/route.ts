import { NextResponse } from "next/server";

export async function GET() {
  const url = `${process.env.PESAPAL_BASE_URL}/Auth/RequestToken`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
