import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ message: "Answer required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("questions").updateOne(
    { _id: new ObjectId(params.id) },
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
