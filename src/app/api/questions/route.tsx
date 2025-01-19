import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await createConnection();
    const sql =
      "SELECT QuestionID, QuestionText, Option1, Option2, Option3, Option4 FROM MCQQ";
    const [result] = await conn.query(sql);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ e });
  }
}
