import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const conn = await createConnection();
    const sql = `SELECT QuestionID, category_id, QuestionText,  Marks FROM programe`;
    const [result] = await conn.query(sql);
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
};
