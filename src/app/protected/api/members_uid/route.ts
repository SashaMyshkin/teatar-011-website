import { createClient } from "@/lib/server";
import { members_uid_get, members_uid_post } from "@/lib/zod/members_uid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const result = members_uid_get.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const {
    offset,
    limit,
    identifier,
    membership_status_uid,
    is_public,
    email,
    
  } = result.data;

  const query = supabase
    .from("members_uid")
    .select(`
      id,
      identifier,
      email,
      date_of_birth,
      date_of_joining,
      date_of_leaving,
      is_public,
      membership_status_uid
    `);

  if (identifier) query.like("identifier", `%${identifier}%`);
  if (membership_status_uid) query.eq("membership_status_uid", membership_status_uid);
  if (!(is_public === undefined)) query.eq("is_public", is_public);
  if (email) query.like("email", `%${email}%`);

  query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  console.log()

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const json = await request.json();
  const validationResult = members_uid_post.safeParse(json);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error, { status: 400 });
  }

  const dataToInsert = validationResult.data;

  const insertedData = await supabase.from("members_uid").insert(dataToInsert).select();

  if (insertedData.error ) {
    return NextResponse.json(insertedData.error || { error: "UID insert failed" }, { status: 500 });
  }

  return NextResponse.json(
    {
      ...insertedData
    },
    { status: 201 }
  );
}