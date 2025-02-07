import { createConnection } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const conn = await createConnection();
  const { userId, startDate, endDate, chapterId } = await request.json();
  const SQL = `INSERT INTO examDetails (userId, startDate,endDate,chapterID) VALUES (?,?,?,?)`;
  try {
    const [result] = await conn.query(SQL, [
      userId,
      startDate,
      endDate,
      chapterId,
    ]);
    const exameId = result.insertId;
    const selectExamSQL = `SELECT * FROM examDetails WHERE examId = ?`;
    const [insertedResult] = await conn.query(selectExamSQL, [exameId]);
    console.log("insertedResult", insertedResult);
    return NextResponse.json({ status: 200, result: insertedResult });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
