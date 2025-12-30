import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

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
