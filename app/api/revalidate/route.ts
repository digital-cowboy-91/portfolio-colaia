import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { authenticator } from "otplib";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("otp");

  if (!token)
    return Response.json({
      status: 400,
      message: "OTP not provided",
    });

  const secret = process.env.TOTP_SECRET!;

  if (!secret)
    return Response.json({
      status: 500,
      message: "TOTP secret is missing",
      newSecret: authenticator.generateSecret(),
    });

  const isValid = authenticator.verify({ token, secret });

  if (!isValid)
    return Response.json({
      status: 400,
      message: "Invalid token",
    });

  revalidatePath("/");

  return Response.json({ status: 200, success: true });
}
