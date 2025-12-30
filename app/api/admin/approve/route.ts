import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, action } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  if (action === "APPROVE") {
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { approved: true } }
    );
  }

  if (action === "REJECT") {
    await db.collection("users").deleteOne({
      _id: new ObjectId(userId),
    });
  }

  return NextResponse.json({ success: true });
}
