// if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
//   module.exports = require("./dev-server");
// }

if (typeof window !== "undefined") {
  module.exports = require("./dev-server");
}
