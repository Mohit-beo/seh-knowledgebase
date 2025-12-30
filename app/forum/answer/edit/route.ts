import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { questionId, answerId, text } = await req.json();
  const client = await clientPromise;
  const db = client.db();

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
