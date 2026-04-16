// Zapier's zapierwrapper.js hardcodes require('./index.js') — this
// re-exports the TypeScript-compiled app definition from lib/.
module.exports = require('./lib/index');
