import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs";
import { jsonForms, userResponses } from "@/configs/schema";
import { getUserData } from "@/lib/getCurrentUser";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const user = await getUserData();

  try {
    
    const totalFormsResult = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.createdBy, user?.email)) 
      .execute();


    const totalResponsesResult = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.createdBy, user?.email)) 
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
