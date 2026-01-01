import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

// GET → Fetch all questions
export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const questions = await db
    .collection("questions")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ questions });
}

// POST → Create new question (Auth required)
export async function POST(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { title, text } = await req.json();

  if (!title || !text) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("questions").insertOne({
    title,
    text,
    userId: user.id,
    userName: user.name,
    createdAt: new Date(),
    answers: [],
  });

  return NextResponse.json({ success: true });
}
