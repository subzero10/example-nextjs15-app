import { NextRequest, NextResponse } from "next/server";
import { withHoneybadger } from "@/honeybadger/with-honeybadger";

const middleware = withHoneybadger(async (req) => {
    const { pathname } = (req as NextRequest).nextUrl

    console.log(pathname)

    return NextResponse.next()
})

export default middleware;
