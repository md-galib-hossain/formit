import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs";
import { jsonForms, userResponses } from "@/configs/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const formId = parseInt(params.id, 10);

  if (isNaN(formId)) {
    return NextResponse.json({ error: "Invalid form ID" }, { status: 400 });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }
    const responses = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formId));

    if (responses.length > 0) {
      await db.delete(userResponses).where(eq(userResponses.formRef, formId));
    }

    await db
      .delete(jsonForms)
      .where(and(eq(jsonForms.id, formId), eq(jsonForms.createdBy, email)));

    return NextResponse.json(
      { message: "Form and associated responses deleted!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting", error);
    return NextResponse.json(
      { error: "Failed to delete form. Please try again." },
      { status: 500 }
    );
  }
}
