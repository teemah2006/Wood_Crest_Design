// app/api/send-verification/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendEmail';

export async function POST(req: Request) {
  const { email, subject, name } = await req.json();
  const result = await sendEmail({to: email, subject: subject, name: name});
  return NextResponse.json(result);
}
