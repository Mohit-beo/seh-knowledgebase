import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const db = await connectDB();

  await db.collection("questions").insertOne({
    title: body.title,
    description: body.description,
    createdBy: body.userId,
    createdByName: body.userName,
    createdAt: new Date(),
    answers: [],
  });

  return NextResponse.json({ success: true });
}
