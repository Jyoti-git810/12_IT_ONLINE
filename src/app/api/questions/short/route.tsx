import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    const pool = await createConnection();
    connection = await pool.getConnection();
    const SQL = `SELECT QuestionID, category_id, QuestionText  FROM shortAns `;
    const [result] = await connection.query(SQL);
    connection.release();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
}
