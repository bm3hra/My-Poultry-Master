const fs = require("fs");
let c = fs.readFileSync("index.html", "utf8");

c = c.split("होम (शुरुआत)").join("होम");

fs.writeFileSync("index.html", c);
console.log("Fixed Home translation!");
