// THIS FILE IS DEPRECATED — NextAuth handler has been moved to /api/auth/[...nextauth]
// This file can be safely deleted.
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { error: "NextAuth has moved to /api/auth/[...nextauth]" },
    { status: 301 }
  );
}

export function POST() {
  return NextResponse.json(
    { error: "NextAuth has moved to /api/auth/[...nextauth]" },
    { status: 301 }
  );
}
