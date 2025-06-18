import { createClient } from "@/lib/server";
import { performances_uid_get, performances_uid_post } from "@/lib/zod/api/performances_uid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );
  const result = performances_uid_get.safeParse(searchParams);

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { offset, limit, is_public, performance_type_uid } = result.data;

  const query = supabase.from("performances_uid").select(`
      id,
      identifier,
      performance_type_uid,
      date_of_premiere,
      is_public
    `);

  if (performance_type_uid)
    query.eq("performance_type_uid", performance_type_uid);
  if (typeof is_public !== "undefined") query.eq("is_public", is_public);

  query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const json = await request.json();

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

   const validationResult = performances_uid_post.safeParse(json);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error, { status: 400 });
  }

  const dataToInsert = validationResult.data;

  const insertedData = await supabase
    .from("performances_uid")
    .insert(dataToInsert)
    .single();

  if (insertedData.error) {
    return NextResponse.json(
      insertedData.error || { error: "Insert action failed" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ...insertedData,
    },
    { status: 201 }
  );
}
