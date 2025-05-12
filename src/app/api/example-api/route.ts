import { NextResponse } from "next/server";
// import { withHoneybadger } from "@/honeybadger/with-honeybadger";

export const dynamic = "force-dynamic";

class HBNodeJsRuntimeError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "HBExampleError";
  }
}

// A faulty API route to test error monitoring
export const GET = async () => {

  console.log("GET Route Handler on Node.js runtime");

  throw new HBNodeJsRuntimeError("This error is raised on the backend (Node.js runtime) called by the example page.");

  return NextResponse.json({ data: "Testing HB Error..." });
};
