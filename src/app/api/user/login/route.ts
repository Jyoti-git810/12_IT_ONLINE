import { createConnection } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request: NextRequest, response: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const secretKey = new TextEncoder().encode("jyotiproject1234#");
    const conn = await createConnection();
    const SQL = `SELECT userId, userName, EMail, Password FROM Users WHERE EMail = ?`;
    const [user] = await conn.query(SQL, [email]);
    if (!user || user.length === 0) {
      return NextResponse.json({ message: "User doesn't exist", status: 400 });
    }
    const { userName, EMail, userId } = user[0];
    const validatePassword = await bcrypt.compare(password, user[0].Password);
    if (!validatePassword) {
      return NextResponse.json({ message: "Password Invalid", status: 400 });
    }
    const token = await new SignJWT({ userName, EMail })
      .setProtectedHeader({ alg: "HS256" }) // Use HMAC SHA-256
      .setIssuedAt()
      .setExpirationTime("2h") // Token expires in 2 hours
      .sign(secretKey);
    cookies().set("uid", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // Expires in 1 day
      path: "/", // Cookie is accessible across the entire site
    });
    return NextResponse.json({
      message: "Login successful",
      redirect: "/",
      status: 200,
      user: { userName, EMail, userId },
    });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
