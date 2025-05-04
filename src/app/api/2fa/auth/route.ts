import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  const secret = process.env.SECRET!;

  const valid = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1,
  });
  if (!valid) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const jwtToken = jwt.sign({ sub: "me" }, process.env.SECRET!, {
    expiresIn: "1h",
  });
  const res = NextResponse.json({ success: true });
  res.cookies.set("glpzghoo", jwtToken, { httpOnly: true, maxAge: 3600 });
  return res;
}
