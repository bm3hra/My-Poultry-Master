const fs = require("fs");

function updateStyles(filename) {
  let html = fs.readFileSync(filename, "utf8");

  // Broiler replacement
  html = html.replace(
    /object-fit:\s*contain;\s*background:\s*#fff;/g,
    "object-fit: cover;",
  );

  // Layer replacement
  html = html.replace(
    /object-fit:\s*contain;\s*background:\s*#000;/g,
    "object-fit: cover;",
  );

  fs.writeFileSync(filename, html);
  console.log("Styles updated in " + filename);
}

updateStyles("index.html");
