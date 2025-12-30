import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { questionId, answerId } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection("questions").updateOne(
    { _id: new ObjectId(questionId) },
    {
      $pull: {
        answers: { _id: new ObjectId(answerId) },
      } as any,
    }
  );

  return NextResponse.json({ success: true });
}
