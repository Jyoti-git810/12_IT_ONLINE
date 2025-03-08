import { createConnection } from "@/lib/dbConnect";
import {
  fetchMarksSqlQueryMapping,
  fibPreviewSQL,
  mcqPreviewSQL,
  programmePreviewSQL,
  rearrangePreviewSQL,
  shortPreviewSQL,
  trueFalsePreview,
} from "@/util/sql_query";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getFieldsTypeCast } from "@/util/condition_check";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "";
    const examId = searchParams.get("examId") || "";
    const conn = await createConnection();
    const [
      [mcqUserResponse],
      [fibUserResponse],
      [trueFalseUserResponse],
      [rearrangeserResponse],
      [shortAnsResponse],
      [programmeResponse],
    ] = await Promise.all([
      conn.query(mcqPreviewSQL, [userId, examId]),
      conn.query(fibPreviewSQL, [userId, examId]),
      conn.query(trueFalsePreview, [userId, examId]),
      conn.query(rearrangePreviewSQL, [userId, examId]),
      conn.query(shortPreviewSQL, [userId, examId]),
      conn.query(programmePreviewSQL, [userId, examId]),
    ]);

    return NextResponse.json([
      ...mcqUserResponse,
      ...fibUserResponse,
      ...trueFalseUserResponse,
      ...rearrangeserResponse,
      ...shortAnsResponse,
      ...programmeResponse,
    ]);
  } catch (e) {
    console.log(e);
  }
}
