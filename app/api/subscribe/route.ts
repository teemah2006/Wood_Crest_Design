import { NextResponse } from 'next/server';
import { AddContacts } from '@/lib/addContact';

export async function POST(req: Request) {
  const { email } = await req.json();
  const result = await AddContacts({email: email});
  return NextResponse.json(result);
}
