import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    const pool = await createConnection();
    connection = await pool.getConnection();
    const sql = "SELECT * FROM `TruOrFalse` LIMIT 10";
    const [result] = await connection.query(sql);
    connection.release();
    return NextResponse.json(result);
  } catch (e) {
    console.error("Error fetching True or False questions:", e);
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
}
