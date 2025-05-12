import type { NextConfig } from "next";
import { setupHoneybadger } from "@/honeybadger";

const nextConfig: NextConfig = {
    /* config options here */
    webpack: (
        config,
        //{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {

        config.optimization.minimizer = [];

        return config
    },
};

// Showing default values
const honeybadgerNextJsConfig = {
    // Disable source map upload (optional)
    disableSourceMapUpload: false,

    // Hide debug messages (optional)
    silent: false,

    // More information available at @honeybadger-io/webpack: https://github.com/honeybadger-io/honeybadger-js/tree/master/packages/webpack
    webpackPluginOptions: {
        // Required if you want to upload source maps to Honeybadger
        apiKey: process.env.NEXT_PUBLIC_HONEYBADGER_API_KEY || "",

        // Required if you want to upload source maps to Honeybadger
        assetsUrl: process.env.NEXT_PUBLIC_HONEYBADGER_ASSETS_URL || "",

        revision: process.env.NEXT_PUBLIC_HONEYBADGER_REVISION || "main",
        endpoint: 'https://api.honeybadger.io/v1/source_maps',
        ignoreErrors: false,
        retries: 3,
        workerCount: 5,
        deploy: {
            environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV || "production",
            repository: 'https://url.to.git.repository',
            localUsername: 'username'
        }
    }
}

export default setupHoneybadger(nextConfig, honeybadgerNextJsConfig);
