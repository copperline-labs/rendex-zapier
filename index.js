// Zapier's zapierwrapper.js hardcodes require('./index.js') — this
// re-exports the TypeScript-compiled app definition from lib/.
//
// TypeScript's `export default {...}` compiles to `exports.default = {...}`,
// so require('./lib/index') returns { default: {...}, __esModule: true }.
// Zapier's lambda runtime expects the app definition at the top level
// (looks for `authentication.test` directly), so we unwrap `.default`.
// Without this, connecting an account fails with:
//   "Could not find the method to call: authentication.test"
module.exports = require('./lib/index').default;
