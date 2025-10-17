import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderTrackingId = searchParams.get("orderTrackingId");

  const tokenRes = await fetch(`${process.env.PESAPAL_BASE_URL}/Auth/RequestToken`, {
    headers: {
      Authorization: `Bearer ${process.env.PESAPAL_CONSUMER_SECRET}`,
    },
  });
  const { token } = await tokenRes.json();

  const res = await fetch(`${process.env.PESAPAL_BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
