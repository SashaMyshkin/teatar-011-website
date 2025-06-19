import { createClient } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";
import {
  members_get,
  members_post,
  members_post_required,
} from "@/lib/zod/api/members";
import { createErrorResponse } from "@/lib/errors/createErrorResponse";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";

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
  const result = members_get.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: result.error.issues[0].message },
      { status: 400 }
    );
  }

  const { offset, limit, name, surname, script_id, member_uid } = result.data;

  const query = supabase.from("members").select(`
      id,
      member_uid,
      script_id,
      name,
      surname,
      motto
    `);

  if (member_uid) query.eq("member_uid", member_uid);
  if (script_id) query.eq("script_id", script_id);
  if (name) query.eq("name", name);
  if (surname) query.eq("surname", surname);

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

  //Authorization check
  if (!authResult.data.user) {
    const { status, body } = createErrorResponse(
      AuthorizationErrorCodes.UnauthorizedRequest
    );
    return NextResponse.json({ ...body }, { status });
  }

  //Check if json is valid
  let json;
  try {
    json = await request.json();
  } catch (error) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.JSONExpected
    );
    return NextResponse.json({ ...body }, { status });
  }

  //Check if required fields are present
  const valReqFieldsRes = members_post_required.safeParse(json);

  if (!valReqFieldsRes.success) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.MissingField
    );
    return NextResponse.json(
      { ...body, details: valReqFieldsRes.error.issues[0].message },
      { status }
    );
  }

  //Check if data are well formed
  const valDataRes = members_post.safeParse(json);
  if (!valDataRes.success) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.InvalidFormat
    );
    return NextResponse.json(
      { ...body, details: valDataRes.error.issues[0].message },
      { status }
    );
  }

  //Insertion
  const dataToInsert = valDataRes.data;
  const insertedData = await supabase
    .from("members")
    .insert(dataToInsert)
    .select()
    .single();

  //Just in case of an error
  if (insertedData.error) {
    console.log(insertedData.error);
    const { body, status } = createErrorResponse(
      ServerErrorCodes.SomethingWentWrong
    );
    return NextResponse.json({ ...body }, { status });
  }

  return NextResponse.json(
    {
      ...insertedData,
    },
    { status: 201 }
  );
}
