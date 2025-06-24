import { createErrorResponse } from "@/lib/errors/createErrorResponse";
import { NextResponse } from "next/server";
import { AllErrorCodes } from "@/lib/errors/errorTypes";

export function respondWithError(code: AllErrorCodes, detail?: string) {
  const { body, status } = createErrorResponse(code);
  return NextResponse.json({ ...body, ...(detail && { details: detail }) }, { status });
}