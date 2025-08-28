import { updateParagraph } from "@/lib/crud_/members_biographies";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { respondWithError } from "@/lib/helpers/respondWithError";
import { createClient } from "@/lib/server";
import {
  idValidation,
  updateParagraphValidFormat,
} from "@/lib/zod/api/members/biography";
import { NextRequest, NextResponse } from "next/server";

//GET handler not needed

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  //Authorization check
  if (!authResult.data.user) {
    return respondWithError(AuthorizationErrorCodes.UnauthorizedRequest);
  }

  const idValidationResult = idValidation.safeParse({
    id: (await params).id,
  });

  //In case something is wrong with the ID
  if (!idValidationResult.success) {
    return respondWithError(ValidationErrorCodes.InvalidID);
  }

  const {id} = idValidationResult.data

  //Check if json is valid
  let jsonFromBody;
  try {
    jsonFromBody = await request.json();
  } catch (error) {
    console.error(error);
    return respondWithError(ValidationErrorCodes.JSONExpected);
  }

  //Checking if properties are valid
  const validationResult = updateParagraphValidFormat.safeParse(jsonFromBody);
  if (!validationResult.success) {
    return respondWithError(
      ValidationErrorCodes.InvalidFormat,
      validationResult.error.issues[0].message
    );
  }

  const {order_number, paragraph} = validationResult.data
  const updateResult = await updateParagraph({order_number, paragraph}, id)

  if (updateResult.error) {
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not update the paragraph"
    );
  }

  return NextResponse.json({ message:"The paragraph was successfully updated" }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  //Authorization check
  if (!authResult.data.user) {
    return respondWithError(AuthorizationErrorCodes.UnauthorizedRequest);
  }

  const idValidationResult = idValidation.safeParse({
    id: (await params).id,
  });

  //In case something is wrong with the ID
  if (!idValidationResult.success) {
    return respondWithError(ValidationErrorCodes.InvalidID);
  }

  const {id} = idValidationResult.data

  const deletedData = await supabase
    .from("members_biographies")
    .delete()
    .eq("id", id);

  if (deletedData.error) {
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not delete the paragraph"
    );
  }

  return NextResponse.json({ message:"The paragraph was successfully deleted" }, { status: 200 });
}
