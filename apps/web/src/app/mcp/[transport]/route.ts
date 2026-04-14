import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ transport: string }> },
) {
  const { transport } = await params;
  const authResult = await auth();

  if (!authResult.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "MCP endpoint",
    transport,
    userId: authResult.userId,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ transport: string }> },
) {
  const { transport } = await params;
  const authResult = await auth();

  if (!authResult.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  return NextResponse.json({
    message: "MCP endpoint",
    transport,
    userId: authResult.userId,
    body,
  });
}
