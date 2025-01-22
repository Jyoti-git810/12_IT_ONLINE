import { createConnection } from "@/lib/dbConnect";
import { getPlaceholders } from "@/util/placeholder";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const { tableName, data } = await request.json();
  const { placeholderValues, placeholder } = getPlaceholders(data);
  const conn = await createConnection();
  const SQL = `INSERT INTO ${tableName} (QuestionID, category_id, userID, answer) VALUES ${placeholder} `;
  try {
    const [result] = await conn.query(SQL, placeholderValues);
    return NextResponse.json({ message: "Data inserted successfully", result });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error occurred", error: error },
      { status: 500 }
    );
  }
}
