import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    const pool = await createConnection();
    connection = await pool.getConnection();
    const SQL = `SELECT m.QuestionID, m.QuestionText,m.CorrectOptions,m.WrongOptions,c.category_name,m.category_id FROM MCQQuestions m 
                INNER JOIN categories c ON m.category_id = c.category_id`;
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
