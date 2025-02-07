import { createConnection } from "@/lib/dbConnect";
import { getPlaceholders } from "@/util/placeholder";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { tableName, data, exmeId, userId } = await request.json();
    const conn = await createConnection();
    console.log("mmm", data);
    const questionIds = data.map((x) => x.question_id);

    const selectSQL = `SELECT * FROM ${tableName} WHERE QuestionID IN (?) AND examId = ? and userId = ?`;
    const insertSQL = `INSERT INTO ${tableName} (QuestionID, category_id, userID, answer, chapterID, chapterName, examId,isSubmit) VALUES (?,?,?,?,?,?,?,1)`;
    const updateSQL = `UPDATE ${tableName} SET answer=?, UpdatedAt=? WHERE QuestionID=? AND userID=? AND category_id=? AND examId=?`;

    const [existingAnswers] = await conn.query(selectSQL, [
      questionIds,
      exmeId,
      userId,
    ]);
    console.log("existingAnswers", existingAnswers);

    for (const item of data) {
      const existingRow = existingAnswers.find(
        (x) =>
          x.QuestionID === item.question_id &&
          x.userID === item.user_id &&
          x.category_id === item.category_id &&
          x.examId === item.examId
      );

      if (existingRow) {
        // If answer exists, update it
        const updateDate = moment().format("YYYY-MM-DD HH:mm:ss");
        await conn.query(updateSQL, [
          item.answer,
          updateDate,
          item.question_id,
          item.user_id,
          item.category_id,
          item.examId,
        ]);
      } else {
        const {
          question_id,
          category_id,
          user_id,
          answer,
          chapter_id,
          chapter_name,
          examId,
        } = item;

        await conn.query(insertSQL, [
          question_id,
          category_id,
          user_id,
          answer,
          chapter_id,
          chapter_name,
          examId,
        ]);
      }
    }
    return NextResponse.json({
      message: "Data processed successfully",
      result: existingAnswers,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error occurred", error },
      { status: 500 }
    );
  }
}
