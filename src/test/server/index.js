// Supaya server msw untuk demo di gh pages bisa jalan, dia perlu juga diekspor
// bahkan ketika production, gak cuman development.
if (typeof window !== "undefined") {
  module.exports = require("./dev-server");
}
