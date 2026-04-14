import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const params = { firstName: "John", lastName: "Wick" };

  const client = await clerkClient();

  const user = await client.users.updateUser(userId, params);

  return NextResponse.json({ user });
}
