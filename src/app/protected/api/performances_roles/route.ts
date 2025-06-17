import { createClient } from "@/lib/server";
import { performances_roles_post } from "@/lib/zod/performances_roles";
import { NextRequest, NextResponse } from "next/server";

//GET HANDLER NOT NEEDED

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const authResult = await supabase.auth.getUser();

  if (!authResult.data.user) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const json = await request.json();
  const validationResult = performances_roles_post.safeParse(json);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error, { status: 400 });
  }

  const dataToInsert = validationResult.data;

  const insertedData = await supabase
    .from("performances_roles")
    .insert(dataToInsert)
    .select()
    .single();

  if (insertedData.error) {
    return NextResponse.json(
      insertedData.error || { error: "Insert operation failed." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ...insertedData,
    },
    { status: 201 }
  );
}
