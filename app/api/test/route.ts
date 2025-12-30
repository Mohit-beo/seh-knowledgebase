import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Simple test query
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully ✅",
      collections: collections.map(c => c.name),
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
