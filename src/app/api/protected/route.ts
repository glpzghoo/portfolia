import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const glpzghoo = request.cookies.get("glpzghoo")?.value;
  if (!glpzghoo) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  try {
    jwt.verify(glpzghoo, process.env.SECRET!);
    return NextResponse.json({ data: "Secret content only for me." });
  } catch {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
}
