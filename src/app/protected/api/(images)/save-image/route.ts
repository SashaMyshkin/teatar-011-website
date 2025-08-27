import {
  deleteImage,
  insertImage,
  insertImageAlt,
  insertImageRelations,
} from "@/lib/crud_/images";
import { selectAllActiveScripts } from "@/lib/crud_/scripts";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { respondWithError } from "@/lib/helpers/respondWithError";
import { createClient } from "@/lib/server";
import { generateLocalizedAltRecords } from "@/lib/services/prepareAltData";
import { addImageValidator } from "@/lib/zod/api/images/images";
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
    return respondWithError(ValidationErrorCodes.JSONExpected);
  }

  //Check if data are well-formed
  const validFormatRes = addImageValidator.safeParse(jsonFromBody);
  if (!validFormatRes.success) {
    return respondWithError(
      ValidationErrorCodes.InvalidFormat,
      validFormatRes.error.issues[0].message
    );
  }

  const { public_url, width, size, height, path } = validFormatRes.data;

  const { data: imageInsertionData, error: imageInsertionError } =
    await insertImage({ public_url, width, size, height, path });

  if (imageInsertionError) {
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not retrieve the id of an image"
    );
  }

  const { id: image_id } = imageInsertionData;
  const { script_id, alt } = validFormatRes.data;

  const localizedAltRecords = generateLocalizedAltRecords(
    { image_id, script_id, alt },
    scripts
  );

  const { error: altInsertionError } = await insertImageAlt(
    localizedAltRecords
  );

  if (altInsertionError) {
    await deleteImage(image_id);
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not insert alt text of an image"
    );
  }

  const { entity_id, entity_type_id } = validFormatRes.data;

  const { error: relationsInsertionError } = await insertImageRelations({
    image_id,
    entity_id,
    entity_type_id,
  });

  if (relationsInsertionError) {
    await deleteImage(image_id);
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not create realations"
    );
  }

  return NextResponse.json(
    { message: "A new image has been recorded." },
    { status: 201 }
  );
}
