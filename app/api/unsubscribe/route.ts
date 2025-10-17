import { NextResponse } from 'next/server';
import { DeleteContact } from '@/lib/deleteContact';
export async function POST(req: Request) {
  const { email } = await req.json();
  const result = await DeleteContact(email);
  return NextResponse.json(result);
}