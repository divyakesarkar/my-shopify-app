// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server. The CLI will eventually
// stop passing in HOST, so we can remove this workaround after the next major release.
if (
 process.env.HOST &&
 (!process.env.SHOPIFY_APP_URL ||
   process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
 process.env.SHOPIFY_APP_URL = process.env.HOST;
 delete process.env.HOST;
}

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
 ignoredRouteFiles: ["**/.*"],
 appDirectory: "app",
 serverModuleFormat: "cjs",
 dev: { port: process.env.HMR_SERVER_PORT || 8002 },
 future: {},
 browserNodeBuiltinsPolyfill: {
   modules: {
     events: true,
     url: true,
     util: true,
     fs: true,
     http: true,
     https: true,
     zlib: true,
     stream: true,
     net: true,
     dns: true,
     os: true,
     path: true,
     crypto: true,
     punycode: true,
     tls: true,
     child_process: true,
     constants: true,  // Polyfill for 'constants'
     assert: true,     // Polyfill for 'assert'
     buffer: true,     // Polyfill for 'buffer'
     querystring: true,// Polyfill for 'querystring'
     timers: true      // Polyfill for 'timers'
   },
 },
};
