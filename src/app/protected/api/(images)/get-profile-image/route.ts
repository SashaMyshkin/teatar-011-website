import { getMemberUidByIdentifier } from "@/lib/crud_/member_uid";
import { getMatchingImage } from "@/lib/crud_/v_images";
import { AuthorizationErrorCodes } from "@/lib/errors/authErrors";
import { ServerErrorCodes } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes } from "@/lib/errors/validationErrors";
import { respondWithError } from "@/lib/helpers/respondWithError";
import { createClient } from "@/lib/server";
import { searchParamsValidation } from "@/lib/zod/api/images/images";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();

  //Authorization check
  if (!authResult.data.user) {
    return respondWithError(AuthorizationErrorCodes.UnauthorizedRequest);
  }

  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  const validatedParams = searchParamsValidation.safeParse(searchParams);
  if (!validatedParams.success) {
    return respondWithError(
      ValidationErrorCodes.InvalidParameterFormat,
      validatedParams.error.issues[0].message
    );
  }

  const { identifier, script_id, type } = validatedParams.data;

  const { data: memberData, error: memberError } =
    await getMemberUidByIdentifier(identifier);

  if (memberError) {
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not retrieve the member by thier identifier. It is most likely that such identifier does not exist"
    );
  }

  const { id: member_uid } = memberData;

  const { data, error: imageError } = await getMatchingImage(
    member_uid,
    type,
    script_id
  );

  if (imageError) {
    return respondWithError(
      ServerErrorCodes.SomethingWentWrong,
      "We could not retrieve the image."
    );
  }

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  );
}
