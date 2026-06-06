const fs = require("fs");
const css = fs.readFileSync("styles.css", "utf8");
const dq = (css.match(/"/g) || []).length;
const sq = (css.match(/'/g) || []).length;
console.log("Double quotes:", dq);
console.log("Single quotes:", sq);

if (dq % 2 !== 0) console.log("Mismatched double quotes!");
if (sq % 2 !== 0) console.log("Mismatched single quotes!");
