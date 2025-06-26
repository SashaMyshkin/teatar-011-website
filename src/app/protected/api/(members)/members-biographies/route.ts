import { getMemberUidByIdentifier } from "@/lib/crud_/member_uid";
import {
  getMaxOrderNumber,
  insertParagraph,
} from "@/lib/crud_/members_biographies";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { respondWithError } from "@/lib/helpers/respondWithError";
import { createClient } from "@/lib/server";
import {
  addParagraphRequiredFields,
  addParagraphValidFormat,
} from "@/lib/zod/api/members_biographies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  //Authorization check
  if (!authResult.data.user) {
    return respondWithError(AuthorizationErrorCodes.UnauthorizedRequest);
  }

  //Check if json is valid
  let jsonFromBody;
  try {
    jsonFromBody = await request.json();
  } catch (error) {
    console.error(error);
    return respondWithError(ValidationErrorCodes.JSONExpected);
  }

  //Check if required fields are present
  const requiredFieldsRes = addParagraphRequiredFields.safeParse(jsonFromBody);
  if (!requiredFieldsRes.success) {
    return respondWithError(
      ValidationErrorCodes.MissingField,
      requiredFieldsRes.error.issues[0].message
    );
  }

  //Check if data are well-formed
  const validFormatRes = addParagraphValidFormat.safeParse(jsonFromBody);
  if (!validFormatRes.success) {
    return respondWithError(
      ValidationErrorCodes.InvalidFormat,
      validFormatRes.error.issues[0].message
    );
  }

  const { identifier, paragraph, script_id } = validFormatRes.data;

  //We're now retrieving member unique id and checking if exists
  const { data: dataIdentifier, error: errorIdentifier } =
    await getMemberUidByIdentifier(identifier);
  if (errorIdentifier) {
    return respondWithError(ValidationErrorCodes.NonExistingIdentifier);
  }

  const member_uid = dataIdentifier.id;

  //Now we are fetching the max order number
  const { data: dataOrderNumber, error: errorOrderNumber } =
    await getMaxOrderNumber(member_uid);

  //If something goes wrong we won't continue
  if (errorOrderNumber) {
    console.log(errorOrderNumber)
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not fetch the order number."
    );
  }

  const order_number = dataOrderNumber.order_number + 1;

  //Now we are ready to insert the paragraph
  const { error: insertionError } =
    await insertParagraph({
      member_uid,
      order_number,
      paragraph,
      script_id,
    });

  //If something goes wrong, we return an error
  if (insertionError) {
    console.log(insertionError)
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not insert the paragraph."
    );
  }

  return NextResponse.json(
    {
      message: "The paragraph was inserted",
    },
    { status: 201 }
  );
}
