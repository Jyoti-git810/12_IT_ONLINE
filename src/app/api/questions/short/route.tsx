import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await createConnection();
    const SQL = `SELECT QuestionID, category_id, QuestionText  FROM shortAns `;
    const [result] = await conn.query(SQL);

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
}
