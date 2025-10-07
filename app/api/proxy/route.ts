import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
  }

  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
