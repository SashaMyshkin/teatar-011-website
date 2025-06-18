import { createClient } from "@/lib/server";
import { performances_roles_uid_put, performances_roles_uid_single } from "@/lib/zod/api/performances_roles_uid";
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

  const { id: role_uid } = await params;
  const idValidationResult = performances_roles_uid_single.safeParse({ role_uid });

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
    .from("performances_roles_uid")
    .select(`
      id,
      performance_uid,
      description,
      importance
    `
    )
    .eq("id", idValidationResult.data.role_uid)
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

  const { id: role_uid } = await params;

  const body = await request.json();

  const idValidationResult = performances_roles_uid_single.safeParse({ role_uid });

  if (!idValidationResult.success) {
    return NextResponse.json(
      {
        error: "Invalid parameter",
        details: idValidationResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const bodyValidationResult = performances_roles_uid_put.safeParse(body);

  if (!bodyValidationResult.success) {
    return NextResponse.json(bodyValidationResult.error, { status: 400 });
  }

  const updatedData = await supabase
    .from("performances_roles_uid")
    .update(bodyValidationResult.data)
    .eq("id", idValidationResult.data.role_uid)
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

  const { id: role_uid } = await params;

  const idValidationResult = performances_roles_uid_single.safeParse({ role_uid });

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
    .from("performances_roles_uid")
    .delete()
    .eq("id", idValidationResult.data.role_uid);

  if (deletedData.error) {
    return NextResponse.json(
      deletedData.error || { error: "Delete action failed" },
      { status: 500 }
    );
  }

  return NextResponse.json(null, { status: 200 });
}
