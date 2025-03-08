import { createConnection } from "@/lib/dbConnect";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let conn; // Use pooled connection
  try {
    conn = await createConnection();
    const { tableName, data, exmeId, userId } = await request.json();
    console.log("Received Data:", data);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No questions provided" },
        { status: 400 }
      );
    }

    const questionIds = data.map((x) => x.QuestionID);
    const placeholders = questionIds.map(() => "?").join(", ");
    const selectSQL = `SELECT * FROM ${tableName} WHERE QuestionID IN (${placeholders}) AND examId = ? AND userId = ?`;
    const insertSQL = `INSERT INTO ${tableName} (QuestionID, category_id, userID, answer, chapterID, chapterName, examId, isSubmit) VALUES (?,?,?,?,?,?,?,1)`;
    const updateSQL = `UPDATE ${tableName} SET answer=?, UpdatedAt=? WHERE QuestionID=? AND userID=? AND category_id=? AND examId=?`;
    const deleteSQL = `DELETE FROM ${tableName} WHERE QuestionID = ? AND userID = ? AND examId = ?`;

    // Fetch existing records
    const [existingAnswers] = await conn.query(selectSQL, [
      ...questionIds,
      exmeId,
      userId,
    ]);

    for (const item of data) {
      const existingRow = existingAnswers.find(
        (x) =>
          x.QuestionID === item.QuestionID &&
          x.userID === userId &&
          x.category_id === item.category_id &&
          x.examId === exmeId
      );

      let parsedAnswer;
      try {
        parsedAnswer = Array.isArray(item.answer)
          ? JSON.parse(item.answer)
          : item.answer;
      } catch {
        parsedAnswer = item.answer;
      }

      if (!parsedAnswer || parsedAnswer.length === 0) {
        await conn.query(deleteSQL, [item.QuestionID, userId, exmeId]);
        continue; // Skip update if deleted
      }

      if (existingRow) {
        const updateDate = moment().format("YYYY-MM-DD HH:mm:ss");
        await conn.query(updateSQL, [
          item.answer,
          updateDate,
          item.QuestionID,
          userId,
          item.category_id,
          exmeId,
        ]);
      } else {
        const { QuestionID, category_id, answer, chapter_id, chapter_name } =
          item;

        await conn.query(insertSQL, [
          QuestionID,
          category_id,
          userId,
          answer,
          chapter_id,
          chapter_name,
          exmeId,
        ]);
      }
    }

    return NextResponse.json({
      message: "Data processed successfully",
      result: existingAnswers,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Error occurred", error },
      { status: 500 }
    );
  }
}
