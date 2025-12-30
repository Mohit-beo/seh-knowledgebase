import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const hashed = await bcrypt.hash(body.password, 10);

  await db.collection("users").insertOne({
    ...body,
    password: hashed,
    role: "USER",
    approved: false,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
