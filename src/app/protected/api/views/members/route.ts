import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { respondWithError } from "@/lib/helpers/respondWithError";
import { createClient } from "@/lib/server";
import { v_members_get } from "@/lib/zod/api/v_members";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  //Authorization check
  if (!authResult.data.user) {
    return respondWithError(AuthorizationErrorCodes.UnauthorizedRequest);
  }

  //Parsing and validating params
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );
  const result = v_members_get.safeParse(searchParams);

  if (!result.success) {
    return respondWithError(ValidationErrorCodes.InvalidFormat, result.error.issues[0].message );
  }

  const { page, pageSize, is_public, script_id, name, surname } = result.data;
  const from = page * pageSize;
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
  if (name) query.ilike("name", `%${name}%`);
  if (surname) query.ilike("surname", `%${surname}%`);

  query.order("is_public", { ascending: false, nullsFirst: false });
  query.order("date_of_joining", { ascending: true, nullsFirst: false });

  query.range(from, to);

  console.log(`from: ${from}; to: ${to}`);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ rows: data, rowCount: count });
}
