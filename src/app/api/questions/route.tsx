import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    const pool = await createConnection();
    connection = await pool.getConnection();
    const sql =
      "SELECT QuestionID, QuestionText, Option1, Option2, Option3, Option4 FROM MCQQ";
    const [result] = await connection.query(sql);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ e });
  } finally {
    if (connection) connection.release(); // Ensure the connection is released back to the pool
  }
}
