import { memberUidUpdate } from "@/lib/crud_/member_uid";
import { memberUpdate } from "@/lib/crud_/members";
import { Database } from "@/lib/database.t";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { createErrorResponse } from "@/lib/errors/createErrorResponse";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { createClient } from "@/lib/server";
import { updateMemberRequiredFields, updateMembersValidFormat } from "@/lib/zod/api/members/update-member";
import { NextRequest, NextResponse } from "next/server";

type MemberUIDUpdate = Database["public"]["Tables"]["members_uid"]["Update"];

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
    console.error(error)
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.JSONExpected
    );
    return NextResponse.json({ ...body }, { status });
  }

  //Check if required fields are present
  const requiredFieldsRes = updateMemberRequiredFields.safeParse(jsonFromBody);

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
  const validFormatRes = updateMembersValidFormat.safeParse(jsonFromBody);
  if (!validFormatRes.success) {
    const { body, status } = createErrorResponse(
      ValidationErrorCodes.InvalidFormat
    );
    return NextResponse.json(
      { ...body, details: validFormatRes.error.issues[0].message },
      { status }
    );
  }

  //If we are here, we are ready for update!
  //First step, preparing data
  const member_uid_data: MemberUIDUpdate = {
    date_of_joining: validFormatRes.data.date_of_joining,
    membership_status_uid: validFormatRes.data.membership_status_uid,
    date_of_birth:validFormatRes.data.date_of_birth,
    email:validFormatRes.data.email
  };

  const identifier = validFormatRes.data.identifier

  //Update
  const memberUidUpdatedData = await memberUidUpdate(identifier, member_uid_data);

  
  //Error check
  if (memberUidUpdatedData.error) {
    const { body, status } = createErrorResponse(
      ServerErrorCodes.SomethingWentWrong
    );
    return NextResponse.json(
      { ...body, details: memberUidUpdatedData.error },
      { status }
    );
  }

  //If everything goes well, we continue with further update
  //Data to update
  const memberData = {
    name: validFormatRes.data.name,
    surname: validFormatRes.data.surname,
    script_id: validFormatRes.data.script_id,
    motto:validFormatRes.data.motto
  };
  const memberUid = memberUidUpdatedData.data.id;
  const script_id = validFormatRes.data.script_id;
  const memberUpdatedData = await memberUpdate(memberUid, script_id, memberData);

  //Error check
  if (memberUpdatedData.error) {
    const { body, status } = createErrorResponse(
      ServerErrorCodes.SomethingWentWrong
    );
    return NextResponse.json(
      { ...body, details: memberUpdatedData.error },
      { status }
    );
  }

  //And finaly, if we are here, it means we've just updated a member!
  return NextResponse.json({message:"The member has been updated."}, { status: 200 });
}
