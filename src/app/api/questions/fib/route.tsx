import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    const pool = await createConnection();
    connection = await pool.getConnection(); // Properly manage connection lifecycle

    const sql = `SELECT FIB.QuestionID, QuestionText,FIB.category_id, FIB.chapterID
FROM FIB
LEFT JOIN FIBUserAnswer 
  ON FIB.QuestionID = FIBUserAnswer.QuestionID 
  AND FIBUserAnswer.UserID = 10
WHERE FIBUserAnswer.QuestionID IS NULL
ORDER BY RAND() LIMIT 10;`;
    const [result] = await connection.query(sql);
    connection.release();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
}
