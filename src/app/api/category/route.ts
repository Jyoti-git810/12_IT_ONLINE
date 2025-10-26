import { NextResponse } from "next/server";
import { createConnection } from "../../../lib/dbConnect";

export async function GET() {
  let conn;
  try {
    conn = await createConnection();
    const sql = "SELECT * FROM categories";
    const [result] = await conn.query(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
