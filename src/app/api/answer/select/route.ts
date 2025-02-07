import { createConnection } from "@/lib/dbConnect";
import { getPlaceholders } from "@/util/placeholder";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const { tableName, userId } = await request.json();
  console.log("userId", userId);
  const conn = await createConnection();
  const selectSQL = `SELECT * FROM ${tableName} WHERE userID = ?`;

  try {
    const [selectSQLResult] = await conn.query(selectSQL, [userId]);
    return NextResponse.json({
      message: "Data inserted successfully",
      data: selectSQLResult,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error occurred", error: error },
      { status: 500 }
    );
  }
}
