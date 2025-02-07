import { createConnection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const conn = await createConnection();
  const SQL = `SELECT chapterID, chapterName FROM ChapterDetails`;
  try {
    const [chapter] = await conn.query(SQL);
    return NextResponse.json({ chapter: chapter, status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server error", status: 500 });
  }
}
