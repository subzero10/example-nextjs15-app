import Honeybadger from "@honeybadger-io/js";
import { NextRequest, NextResponse } from "next/server";

function configure() {
    if (Honeybadger.config.apiKey?.length > 0) {
        return;
    }

    let projectRoot = undefined;
    try {
        // not available on edge runtime
        projectRoot = process.cwd();
    }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        // do nothing
    }

    Honeybadger
        .configure({
            apiKey: process.env.NEXT_PUBLIC_HONEYBADGER_API_KEY,
            environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV,
            revision: process.env.NEXT_PUBLIC_HONEYBADGER_REVISION,
            projectRoot: 'webpack://_N_E/./',
            debug: true,
            reportData: true,
        })
        .beforeNotify((notice) => {
            if (!projectRoot) {
                return
            }

            notice?.backtrace.forEach((line) => {
                if (line.file) {
                    line.file = line.file.replace(`${projectRoot}/.next/server`, `${process.env.NEXT_PUBLIC_HONEYBADGER_ASSETS_URL}/..`)
                }
                return line
            })
        })
}

export function withHoneybadger(handler: (req: NextRequest | Request, ...args: unknown[]) => Promise<NextResponse>) {
    configure();
    return new Proxy(handler, {
        apply: async (target, thisArg, args) => {
            try {
                return await Reflect.apply(target, thisArg, args);
            } catch (error) {
                await Honeybadger.notifyAsync(error as Error);
                throw error; // Re-throw the error after reporting it
            }
        },
    });
}
