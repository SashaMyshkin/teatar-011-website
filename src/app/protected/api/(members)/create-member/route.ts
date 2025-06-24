import { memberUidInsert } from "@/lib/crud_/member_uid";
import { memberInsert } from "@/lib/crud_/members";
import { selectAllActiveScripts } from "@/lib/crud_/scripts";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { IdentifierCheck } from "@/lib/helpers/identifier";
import { respondWithError } from "@/lib/helpers/respondWithError";
import { createClient } from "@/lib/server";
import { generateLocalizedMemberRecords } from "@/lib/services/prepareMemberData";
import {
  createMemberRequiredFields,
  createMembersValidFormat,
} from "@/lib/zod/api/members/create-member";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  //Authorization check
  if (!authResult.data.user) {
    return respondWithError(AuthorizationErrorCodes.UnauthorizedRequest);
  }

  //Check if there is active scripts
  const { data, error } = await selectAllActiveScripts();
  if (error) {
    return respondWithError(ServerErrorCodes.NoActiveScripts);
  }

  const scripts = data;

  //Check if json is valid
  let jsonFromBody;
  try {
    jsonFromBody = await request.json();
  } catch (error) {
    console.error(error);
    return respondWithError(ValidationErrorCodes.JSONExpected);
  }

  //Check if required fields are present
  const requiredFieldsRes = createMemberRequiredFields.safeParse(jsonFromBody);
  if (!requiredFieldsRes.success) {
    return respondWithError(
      ValidationErrorCodes.MissingField,
      requiredFieldsRes.error.issues[0].message
    );
  }

  //Check if data are well-formed
  const validFormatRes = createMembersValidFormat.safeParse(jsonFromBody);
  if (!validFormatRes.success) {
    return respondWithError(
      ValidationErrorCodes.InvalidFormat,
      validFormatRes.error.issues[0].message
    );
  }

  //Checking if identifier is unique
  const resultUniqueCheck = await IdentifierCheck.membersUID.CheckIfUnique(
    validFormatRes.data.identifier
  );

  //If there was an error while checking
  if (resultUniqueCheck.error) {
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "Unable to check if identifier is unique."
    );
  }

  //If it is not unique, we return an error
  if (!resultUniqueCheck.isUnique) {
    return respondWithError(ValidationErrorCodes.IdentifierExists);
  }

  const {
    name,
    surname,
    script_id,
    membership_status_uid,
    date_of_joining,
    identifier,
  } = validFormatRes.data;

  //If we are here, we are ready for insertion!
  //Insertion
  const memberUidInsertion = await memberUidInsert({
    identifier,
    date_of_joining,
    membership_status_uid,
  });

  //Error check
  if (memberUidInsertion.error) {
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "Error hepend while retrieving members unique id."
    );
  }

  //Getting member unique id
  const { id } = memberUidInsertion.data;

  //Inserting member data that can change depending on a language
  const dataToInsert = generateLocalizedMemberRecords(
    {
      name,
      surname,
      script_id,
      motto: null,
      member_uid: id,
    },
    scripts
  );
  const memberInsertion = await memberInsert(dataToInsert);

  //Error check
  if (memberInsertion.error) {
    console.log(memberInsertion)
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "Error happened while inserting a member localized data."
    );
  }

  //And finally, if we are here, it means we've just created a new member!
  return NextResponse.json(
    { message: "A new user has been created." },
    { status: 201 }
  );
}
