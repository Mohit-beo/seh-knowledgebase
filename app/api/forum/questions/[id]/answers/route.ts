import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import type { Question } from "@/types/forum";

export async function POST(
  request: NextRequest,
  context: any // <-- IMPORTANT FIX
) {
  const { id } = context.params; // safe access

  // 1️⃣ Read token
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Verify JWT
  let user: { id: string; name: string };
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name: string;
    };
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // 3️⃣ Parse body
  const { text } = await request.json();
  if (!text) {
    return NextResponse.json(
      { message: "Answer text required" },
      { status: 400 }
    );
  }

  // 4️⃣ MongoDB insert
  const client = await clientPromise;
  const db = client.db();

  await db.collection<Question>("questions").updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        answers: {
          _id: new ObjectId(),
          text,
          userId: user.id,
          userName: user.name,
          createdAt: new Date(),
        },
      },
    }
  );

  return NextResponse.json({ success: true });
}
