import { memberUidInsert } from "@/lib/crud/member_uid";
import { memberInsert } from "@/lib/crud/members";
import { Database } from "@/lib/database.t";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { createErrorResponse } from "@/lib/errors/createErrorResponse";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { identifier } from "@/lib/helpers/identifier";
import { createClient } from "@/lib/server";
import {
  createMemberRequiredFields,
  createMembersValidFormat,
} from "@/lib/zod/api/create-member";
import { NextRequest, NextResponse } from "next/server";

type MemberUIDInsert = Database["public"]["Tables"]["members_uid"]["Insert"];

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
  let jsonFromBody;
  try {
    jsonFromBody = await request.json();
  } catch (error) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.JSONExpected
    );
    return NextResponse.json({ ...body }, { status });
  }

  //Check if required fields are present
  const requiredFieldsRes = createMemberRequiredFields.safeParse(jsonFromBody);

  if (!requiredFieldsRes.success) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.MissingField
    );
    return NextResponse.json(
      { ...body, details: requiredFieldsRes.error.issues[0].message },
      { status }
    );
  }

  //Check if data are well-formed
  const validFormatRes = createMembersValidFormat.safeParse(jsonFromBody);
  if (!validFormatRes.success) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.InvalidFormat
    );
    return NextResponse.json(
      { ...body, details: validFormatRes.error.issues[0].message },
      { status }
    );
  }

  //Checking if identifier is unique
  const isUnique = await identifier.membersUID.isUnique(
    validFormatRes.data.identifier
  );

  //If it is not, we return an error
  if (!isUnique) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.IdentificatorExists
    );
    return NextResponse.json({ ...body }, { status });
  }

  //If we are here, we are ready for insertion!
  //First step, preparing data
  const member_uid: MemberUIDInsert = {
    identifier: validFormatRes.data.identifier,
    date_of_joining: validFormatRes.data.date_of_joining,
    membership_status_uid: validFormatRes.data.membership_status_uid,
  };

  //Insertion
  const memberUidInsertion = await memberUidInsert(member_uid);

  //Error check
  if (memberUidInsertion.error) {
    const { body, status } = createErrorResponse(
      ServerErrorCodes.SomethingWentWrong
    );
    return NextResponse.json(
      { ...body, details: memberUidInsertion.error },
      { status }
    );
  }

  //If everything goes well, we continue with further insertion
  //Data to insert
  const member = {
    member_uid: memberUidInsertion.data.id,
    name: validFormatRes.data.name,
    surname: validFormatRes.data.surname,
    script_id: 2,
  };

  const memberInsertion = await memberInsert(member);

  //Error check
  if (memberInsertion.error) {
    const { body, status } = createErrorResponse(
      ServerErrorCodes.SomethingWentWrong
    );
    return NextResponse.json(
      { ...body, details: memberInsertion.error },
      { status }
    );
  }

  //And finaly, if we are here, it means we've just created a new member!
  return NextResponse.json({message:"A new user has been created."}, { status: 201 });
}
