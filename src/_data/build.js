// Cache-busting version for CSS/JS — changes on every deploy so browsers never show a stale stylesheet.
const { execSync } = require("child_process");
let v;
try { v = execSync("git rev-parse --short HEAD").toString().trim(); } catch (e) { v = String(Date.now()); }
module.exports = { v: process.env.CF_PAGES_COMMIT_SHA ? process.env.CF_PAGES_COMMIT_SHA.slice(0, 7) : v };
