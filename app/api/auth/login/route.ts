import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({ email });

  if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" } // ✅ token expiry
  );

  const res = NextResponse.redirect(new URL("/dashboard", req.url));

  res.cookies.set("token", token, {
    httpOnly: true,                    // ✅ HTTP-only cookie
    secure: process.env.NODE_ENV === "production", // ✅ secure in prod
    sameSite: "lax",                    // ✅ must be "lax" for SPA
    path: "/",                          // ✅ available on all routes
    maxAge: 60 * 60 * 24 * 7,           // 7 days
  });

  return res;
}
