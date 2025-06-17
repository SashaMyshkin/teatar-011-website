import { createClient } from "@/lib/server";
import { performances_about_get_single, performances_about_put } from "@/lib/zod/performances_about";
import { NextRequest, NextResponse } from "next/server";

//GET handler not needed

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const { id:paragraph_id } = await params;

  const body = await request.json();

  const idValidationResult = performances_about_get_single.safeParse({ paragraph_id });

  if (!idValidationResult.success) {
    return NextResponse.json(
      {
        error: "Invalid parameter",
        details: idValidationResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const bodyValidationResult = performances_about_put.safeParse(body);

  if (!bodyValidationResult.success) {
    return NextResponse.json(bodyValidationResult.error, { status: 400 });
  }

  const updatedData = await supabase
    .from("performances_about")
    .update(bodyValidationResult.data)
    .eq("id", idValidationResult.data.paragraph_id)
    .select()
    .single();

  if (updatedData.error) {
    return NextResponse.json(
      updatedData.error || { error: "Update action failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ...updatedData.data }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const { id: paragraph_id } = await params;

  const idValidationResult = performances_about_get_single.safeParse({ paragraph_id });

  if (!idValidationResult.success) {
    return NextResponse.json(
      {
        error: "Invalid parameter",
        details: idValidationResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const deletedData = await supabase
    .from("performances_about")
    .delete()
    .eq("id", idValidationResult.data.paragraph_id);

  if (deletedData.error) {
    return NextResponse.json(
      deletedData.error || { error: "Delete action failed" },
      { status: 500 }
    );
  }

  return NextResponse.json(null, { status: 200 });
}