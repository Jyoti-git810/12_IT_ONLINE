import { createConnection } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const conn = await createConnection();
    const sql = `SELECT QuestionID, QuestionText,category_id FROM FIB`;
    const [result] = await conn.query(sql);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
}
