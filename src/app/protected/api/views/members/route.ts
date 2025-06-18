import { createClient } from "@/lib/server";
import { v_members_get } from "@/lib/zod/api/v_members";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //Authentication
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();
  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  //Parsing and validating params
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );
  const result = v_members_get.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { page, pageSize, is_public, script_id, name, surname } = result.data;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  //Creating query
  const query = supabase
    .from("v_members")
    .select(
      `
      member_uid,
      name,
      surname,
      date_of_joining,
      email,
      identifier,
      membership_status,
      is_public
    `,
      {
        count: "exact",
      }
    )
    .eq("script_id", script_id);

  if (typeof is_public !== "undefined") query.eq("is_public", is_public);
  if (name) query.eq("name", name);
  if (surname) query.eq("surname", surname);

  query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ rows: data, rowCount: count });
}
