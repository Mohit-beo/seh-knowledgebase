import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connectDB();
  const questions = await db
    .collection("questions")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(questions);
}
