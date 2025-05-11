import { NextResponse } from "next/server";
import { withHoneybadger } from "@/honeybadger/with-honeybadger";

export const runtime = "edge";

class HBEdgeRuntimeError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "HBEdgeRuntimeError";
  }
}

// A faulty API route to test error monitoring
export const GET = withHoneybadger(async () => {

  console.log("GET Route Handler on Edge runtime");

  throw new HBEdgeRuntimeError("This error is raised on the backend (edge runtime) called by the example page.");

  return NextResponse.json({ data: "Testing HB Error..." });
});
