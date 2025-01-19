import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const conn = await createConnection();
    const sql = `SELECT QuestionID,leftPart,correctAnswer,category_id FROM  RearrangeQuestions limit 5;`;
    const [result] = await conn.query(sql);
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
};
