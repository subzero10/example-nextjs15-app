import { NextResponse } from "next/server";
import { withHoneybadger } from "@/honeybadger/with-honeybadger";

export const dynamic = "force-dynamic";

class HBExampleError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "HBExampleError";
  }
}

// A faulty API route to test error monitoring
export const GET = withHoneybadger(async () => {

  console.log("GET Route Handler");

  throw new HBExampleError("This error is raised on the backend called by the example page.");

  return NextResponse.json({ data: "Testing HB Error..." });
});
