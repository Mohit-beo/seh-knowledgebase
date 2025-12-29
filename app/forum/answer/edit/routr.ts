import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { questionId, answerId, text } = await req.json();
  const db = await connectDB();

  await db.collection("questions").updateOne(
    {
      _id: new ObjectId(questionId),
      "answers._id": new ObjectId(answerId),
    },
    {
      $set: {
        "answers.$.text": text,
      },
    }
  );

  return NextResponse.json({ success: true });
}
