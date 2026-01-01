import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
