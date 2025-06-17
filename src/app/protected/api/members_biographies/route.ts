import { createClient } from "@/lib/server";
import { members_biographies_get, members_biographies_post } from "@/lib/zod/members_biographies";
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

  const result = members_biographies_get.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { offset, limit, script_id, member_uid } = result.data;

  const query = supabase.from("members_biographies").select(`
      id,
      member_uid,
      script_id,
      paragraph,
      order_number
    `).eq("member_uid", member_uid);

  if (member_uid) query.eq("member_uid", member_uid);
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
  const validationResult = members_biographies_post.safeParse(json);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error, { status: 400 });
  }

  const dataToInsert = validationResult.data;

  const insertedData = await supabase
    .from("members_biographies")
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
