import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  let connection;
  try {
    const pool = await createConnection();
    connection = await pool.getConnection();
    const sql = `SELECT QuestionID,leftPart,correctAnswer,category_id FROM  RearrangeQuestions limit 5;`;
    const [result] = await connection.query(sql);
    return NextResponse.json(result);
    connection.release();
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
};
