import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await createConnection();
    const sql = "SELECT * FROM `TruOrFalse`";
    const [result] = await conn.query(sql);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ e });
  }
}
