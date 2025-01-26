import { createConnection } from "@/lib/dbConnect";
import {
  fetchMarksSqlQueryMapping,
  fibPreviewSQL,
  mcqPreviewSQL,
  previewQuestionSQLMapping,
  rearrangePreviewSQL,
  trueFalsePreview,
} from "@/util/sql_query";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getFieldsTypeCast } from "@/util/condition_check";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const conn = await createConnection();
    const [
      [mcqUserResponse],
      [fibUserResponse],
      [trueFalseUserResponse],
      [rearrangeserResponse],
    ] = await Promise.all([
      conn.query(mcqPreviewSQL),
      conn.query(fibPreviewSQL),
      conn.query(trueFalsePreview),
      conn.query(rearrangePreviewSQL),
    ]);

    return NextResponse.json([
      ...mcqUserResponse,
      ...fibUserResponse,
      ...trueFalseUserResponse,
      ...rearrangeserResponse,
    ]);
  } catch (e) {
    console.log(e);
  }
}
