import { createClient } from "@/lib/server";
import { NextRequest } from "next/server";
import { z } from "zod";

// Define the schema
const getSchema = z.object({
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(100).default(10),
  scriptId: z.coerce.number().optional(),
  identifier: z.string().optional(),
  membershipStatusUID: z.coerce.number().optional(),
  isPublic: z.coerce.boolean().optional(),
  email: z.string().optional(),
  memberUID: z.coerce.number().optional(),
});

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  // Validate with Zod
  const result = getSchema.safeParse(searchParams);

  if (!result.success) {
    return Response.json(
      { error: "Invalid query parameters", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const {
    offset,
    limit,
    identifier,
    membershipStatusUID,
    isPublic,
    email,
    scriptId,
  } = result.data;

  const supabase = await createClient();

  const query = supabase
    .from("v_members")
    .select(
      `
    muid,
    identifier,
    email,
    date_of_birth,
    date_of_joining,
    date_of_leaving,
    public,
    name,
    surname,
    script_id,
    script,
    membership_status_uid,
    membership_status
  `
    );

  if (identifier) query.eq("identifier", identifier);
  if (membershipStatusUID)
    query.eq("membership_status_uid", membershipStatusUID);
  if (isPublic === true) query.eq("public", 1);
  if (isPublic === false) query.eq("public", 0);
  if (email) query.eq("email", email);
  if(scriptId) query.eq("script_id", scriptId);

  const { data, error } = await query

  return Response.json({ data });
}
