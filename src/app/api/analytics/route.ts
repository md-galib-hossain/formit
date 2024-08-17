import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs";
import { jsonForms, userResponses } from "@/configs/schema";

export async function GET(req: NextRequest) {
  try {
    const totalFormsResult = await db
      .select()
      .from(jsonForms)
      .execute();

    const totalResponsesResult = await db
      .select()
      .from(userResponses)
      .execute();

    const totalFormsCount = totalFormsResult.length;
    const totalResponsesCount = totalResponsesResult.length;

    return NextResponse.json({
      totalForms: totalFormsCount,
      totalResponses: totalResponsesCount,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' });
  }
}
