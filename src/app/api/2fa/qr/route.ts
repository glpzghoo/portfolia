import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export async function GET() {
  const secret = process.env.SECRET!;
  console.log(secret);
  const otpauth = speakeasy.otpauthURL({
    secret,
    label: "personal",
    issuer: "glpzghoo",
    encoding: "base32",
  });
  const qrCodeDataURL = await QRCode.toDataURL(otpauth);
  return NextResponse.json({ qrCodeDataURL, manualCode: secret });
}
