import { createClient } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";
import { getSchema, membersUID } from "./validation";



export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const result = getSchema.safeParse(searchParams);

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
    membershipStatusUID,
    isPublic,
    email,
    scriptId,
  } = result.data;

  const query = supabase
    .from("v_members")
    .select(`
      muid,
      identifier,
      email,
      date_of_birth,
      date_of_joining,
      date_of_leaving,
      public,
      name,
      surname,
      script_id,
      script,
      membership_status_uid,
      membership_status,
      motto
    `);

  if (identifier) query.eq("identifier", identifier);
  if (membershipStatusUID) query.eq("membership_status_uid", membershipStatusUID);
  if (isPublic !== undefined) query.eq("public", isPublic ? 1 : 0);
  if (email) query.eq("email", email);
  if (scriptId) query.eq("script_id", scriptId);

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
  const validationResult = membersUID.safeParse(json);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error, { status: 400 });
  }

  const { member, biography, ...uidData } = validationResult.data;

  const insertUID = await supabase.from("members_uid").insert(uidData).select();

  if (insertUID.error || !insertUID.data?.[0]?.id) {
    return NextResponse.json(insertUID.error || { error: "UID insert failed" }, { status: 500 });
  }

  const member_uid = insertUID.data[0].id;

  const appendUID = (arr: any[]) => arr.map((item) => ({ ...item, member_uid }));

  const [insertMembers, insertBiographies] = await Promise.all([
    supabase.from("members").insert(appendUID(member)).select(),
    supabase.from("members_biographies").insert(appendUID(biography)).select(),
  ]);

  if (insertMembers.error) {
    return NextResponse.json(insertMembers.error, { status: 500 });
  }

  if (insertBiographies.error) {
    return NextResponse.json(insertBiographies.error, { status: 500 });
  }

  return NextResponse.json(
    {
      member_uid,
      insertMembersResult: insertMembers.data,
      insertBiographyResult: insertBiographies.data,
    },
    { status: 201 }
  );
}