import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  let connection;
  try {
    const pool = await createConnection();
    connection = await pool.getConnection();
    const sql = `SELECT QuestionID, category_id, QuestionText,  Marks FROM programe`;
    const [result] = await connection.query(sql);
    connection.release();
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
};
