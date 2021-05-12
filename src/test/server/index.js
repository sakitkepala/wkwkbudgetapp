// Supaya server msw untuk demo di gh pages bisa jalan, dia perlu juga diekspor
// bahkan ketika production, gak cuman development.
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  module.exports = require("./dev-server");
} else if (
  process.env.NODE_ENV === "production" &&
  typeof window !== "undefined"
) {
  module.exports = require("./prod-server");
}
