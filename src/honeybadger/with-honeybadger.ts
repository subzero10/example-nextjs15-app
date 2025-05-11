import Honeybadger from "@honeybadger-io/js";

function configure() {
    if (Honeybadger.config.apiKey?.length > 0) {
        return;
    }
    Honeybadger.configure({
        apiKey: process.env.NEXT_PUBLIC_HONEYBADGER_API_KEY,
        environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV,
        revision: process.env.NEXT_PUBLIC_HONEYBADGER_REVISION,
        projectRoot: 'webpack://_N_E/./',
        debug: true,
        reportData: true,
    })
}


export function withHoneybadger(handler: (...args: never[]) => Promise<never>) {
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
