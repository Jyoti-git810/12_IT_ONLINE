import { createConnection } from "@/lib/dbConnect";
import { getPlaceholders } from "@/util/placeholder";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const { tableName, userId, examId } = await request.json();
  let conn;
  const selectSQL = `SELECT * FROM ${tableName} WHERE userID = ? AND examId=?`;

  try {
    conn = await createConnection();
    const [selectSQLResult] = await conn.query(selectSQL, [userId, examId]);
    return NextResponse.json({
      message: "Data fetched successfully",
      data: selectSQLResult,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred", error: error },
      { status: 500 }
    );
  }
}
