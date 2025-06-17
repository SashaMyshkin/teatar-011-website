import { createClient } from "@/lib/server";
import { performances_about_get, performances_about_post } from "@/lib/zod/performances_about";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  const result = performances_about_get.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { offset, limit, script_id, performance_uid } = result.data;

  const query = supabase.from("performances_about").select(`
      id,
      performance_uid,
      script_id,
      paragraph,
      order_number
    `).eq("performance_uid", performance_uid);

  if (script_id) query.eq("script_id", script_id);

  query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
}


export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const json = await request.json();
  const validationResult = performances_about_post.safeParse(json);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error, { status: 400 });
  }

  const dataToInsert = validationResult.data;

  const insertedData = await supabase
    .from("performances_about")
    .insert(dataToInsert)
    .select()
    .single();

  if (insertedData.error) {
    return NextResponse.json(
      insertedData.error || { error: "Insert operation failed." },
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
