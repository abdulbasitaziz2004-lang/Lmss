// app/api/me/route.js
import { auth } from "@clerk/nextjs/server";
import { connect } from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connect();
  const user = await User.findOne({ clerkId: userId }).select("role").lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ role: user.role });
}