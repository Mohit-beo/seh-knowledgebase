import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import type { Question } from "@/types/forum";

// ==========================
// GET → Fetch all questions
// ==========================
export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const questions = await db
    .collection<Question>("questions")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ questions });
}

// ==========================
// POST → Create new question
// ==========================
export async function POST(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let user: { id: string; name: string };

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name: string;
    };
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { title, text } = await req.json();

  if (!title || !text) {
    return NextResponse.json(
      { message: "Title and text are required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db();

  const newQuestion: Question = {
    _id: new ObjectId(),
    title,
    text,
    userId: user.id,
    userName: user.name,
    createdAt: new Date(),
    answers: [],
  };

  await db.collection<Question>("questions").insertOne(newQuestion);

  return NextResponse.json({ success: true, question: newQuestion });
}
