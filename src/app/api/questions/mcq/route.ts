import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await createConnection();
    const SQL = `
                SELECT m.QuestionID, m.QuestionText,m.CorrectOptions,m.WrongOptions,c.category_name,m.category_id FROM MCQQuestions m 
                INNER JOIN categories c ON m.category_id = c.category_id`;
    const [result] = await conn.query(SQL);

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
}
