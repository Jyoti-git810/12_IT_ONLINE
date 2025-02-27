import { createConnection } from "@/lib/dbConnect";
import { fetchMarksSqlQueryMapping } from "@/util/sql_query";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getFieldsTypeCast } from "@/util/condition_check";

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const key: string = searchParams.get("key") || "";
  const userId = searchParams.get("userId") || "";
  const examId = searchParams.get("examId") || "";
  const SQLQuery = fetchMarksSqlQueryMapping[key];
  try {
    const conn = await createConnection();
    const [userResponse] = await conn.query(SQLQuery, [userId, examId]);
    const totalMarks = userResponse.reduce((totalMarks: number, y) => {
      let isEqual;
      const { dbcorrectAnswer, userResAnswer } = getFieldsTypeCast(y);
      if (key === "mcq") {
        const userAnswer = JSON.parse(y.userAnswer);
        const correctOptions = JSON.parse(y.CorrectOptions);
        isEqual = key === "mcq" && _.isEqual(userAnswer, correctOptions);
      }
      if (
        y.QuestionID === y.answeredQustionID &&
        (isEqual || (key !== "mcq" && dbcorrectAnswer === userResAnswer))
      ) {
        totalMarks = totalMarks + y.Marks;
      }
      return totalMarks;
    }, 0);

    return NextResponse.json({
      [`${key}TotalMarks`]: totalMarks,
    });
  } catch (e) {
    console.log(e);
  }
}
