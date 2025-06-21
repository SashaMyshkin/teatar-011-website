import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { createErrorResponse } from "@/lib/errors/createErrorResponse";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { identifier } from "@/lib/helpers/identifier";
import { createClient } from "@/lib/server";
import {
  members_uid_get,
  members_uid_get_required,
  members_uid_post,
  members_uid_post_requred,
} from "@/lib/zod/api/members_uid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  //Authorization check
  if (!authResult.data.user) {
    const { status, body } = createErrorResponse(
      AuthorizationErrorCodes.UnauthorizedRequest
    );
    return NextResponse.json({ ...body }, { status });
  }

  //Parameters check
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  //if required parameters do not exist
  const validationRequredFields =
    members_uid_get_required.safeParse(searchParams);

  if (!validationRequredFields.success) {
    const { status, body } = createErrorResponse(
      ValidationErrorCodes.MissingField
    );
    return NextResponse.json(
      { ...body, details: validationRequredFields.error.issues[0].message },
      { status }
    );
  }

  //if parameters are malformed
  const formValidation = members_uid_get.safeParse(searchParams);

  if (!formValidation.success) {
    const { status, body } = createErrorResponse(
      ValidationErrorCodes.InvalidFormat
    );
    return NextResponse.json(
      { ...body, details: formValidation.error.issues[0].message },
      { status }
    );
  }

  //Querying database
  const { offset, limit } = formValidation.data;
  const query = supabase.from("members_uid").select(`
      id,
      identifier,
      email,
      date_of_birth,
      date_of_joining,
      date_of_leaving,
      is_public,
      membership_status_uid
    `);
  query.order("id");
  query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    const { body, status } = createErrorResponse(
      ServerErrorCodes.SomethingWentWrong
    );
    return NextResponse.json({ ...body }, { status });
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
    console.log(error)
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.JSONExpected
    );
    return NextResponse.json({ ...body }, { status });
  }

  //Check if required fields are present
  const valReqFieldsRes = members_uid_post_requred.safeParse(json);

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
  const valDataRes = members_uid_post.safeParse(json);
  if (!valDataRes.success) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.InvalidFormat
    );
    return NextResponse.json(
      { ...body, details: valDataRes.error.issues[0].message },
      { status }
    );
  }

  //Checking if identifier is unique
  const isUnique = await identifier.membersUID.isUnique(valDataRes.data.identifier);

  if (!isUnique) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.IdentificatorExists
    );
    return NextResponse.json({ ...body }, { status });
  }

  //Insertion
  const insertedData = await supabase
    .from("members_uid")
    .insert({
      ...valDataRes.data,
      is_public: 0,
    })
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

  //Response returned
  return NextResponse.json(
    {
      ...insertedData.data,
    },
    { status: 201 }
  );
}
