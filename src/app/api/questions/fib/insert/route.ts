import { createConnection } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const values = reqBody.map((item) => [
      item.question_id,
      item.category_id,
      item.user_id,
      item.answer,
    ]);
    const conn = await createConnection();
    const placeholders = values.map(() => "(?, ?, ?, ?)").join(", ");
    const SQL = `INSERT INTO FIBUserAnswer (QuestionID, category_id, userID, answer) VALUES ${placeholders}`;
    const flattenedValues = values.flat();
    const [result] = await conn.query(SQL, flattenedValues);
    return NextResponse.json({ message: "Data inserted successfully", result });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Error occurred", error: error.message },
      { status: 500 }
    );
  }
}
