import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { questionId, text, userId, userName } = await req.json();
  const db = await connectDB();

  await db.collection("questions").updateOne(
    { _id: new ObjectId(questionId) },
    {
      $push: {
        answers: {
          text,
          userId,
          userName,
          createdAt: new Date(),
        } as any,
      },
    }
  );

  return NextResponse.json({ success: true });
}
