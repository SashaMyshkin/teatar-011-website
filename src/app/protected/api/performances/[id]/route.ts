import { createClient } from "@/lib/server";
import { performance_get_single, performance_put } from "@/lib/zod/performances";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const { id: performance_id } = await params;

  const idValidationResult = performance_get_single.safeParse({ performance_id });

  if (!idValidationResult.success) {
    return NextResponse.json(
      {
        error: "Invalid parameter",
        details: idValidationResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("performances")
    .select(
      `
      id,
      performance_uid,
      script_id,
      title,
      slogan
    `
    )
    .eq("id", idValidationResult.data.performance_id)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const { id: member_uid } = await params;

  const body = await request.json();

  const idValidationResult = performance_get_single.safeParse({ member_uid });

  if (!idValidationResult.success) {
    return NextResponse.json(
      {
        error: "Invalid parameter",
        details: idValidationResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const bodyValidationResult = performance_put.safeParse(body);

  if (!bodyValidationResult.success) {
    return NextResponse.json(bodyValidationResult.error, { status: 400 });
  }

  const updatedData = await supabase
    .from("performances")
    .update(bodyValidationResult.data)
    .eq("id", idValidationResult.data.performance_id)
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
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const { id: member_id } = await params;

  const idValidationResult = performance_get_single.safeParse({ member_id });

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
    .from("performances")
    .delete()
    .eq("id", idValidationResult.data.performance_id);

  if (deletedData.error) {
    return NextResponse.json(
      deletedData.error || { error: "Delete action failed" },
      { status: 500 }
    );
  }

  return NextResponse.json(null, { status: 200 });
}
