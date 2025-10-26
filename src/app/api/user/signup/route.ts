import { createConnection } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody", reqBody);
    const { name, email, password } = reqBody;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const conn = await createConnection();
    const sqlsearch = `SELECT userId, userName, EMail FROM Users WHERE  EMail = '${email}'`;
    const [userExsist] = await conn.query(sqlsearch);
    if (userExsist.length) {
      return NextResponse.json({ message: "User Already Exsist", status: 200 });
    } else {
      const SQL = `INSERT INTO Users (userName, EMail, Password) VALUES (?, ?, ?)`;
      await conn.query(SQL, [name, email, hashPassword]);
      return NextResponse.json(
        { message: "Registration done" },
        { status: 200 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
