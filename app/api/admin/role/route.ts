import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, role } = await req.json();
  const db = await connectDB();

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { role } }
  );

  return NextResponse.json({ success: true });
}
