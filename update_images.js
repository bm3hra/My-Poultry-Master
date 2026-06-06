const fs = require("fs");

function updateImageRefs(filename) {
  let html = fs.readFileSync(filename, "utf8");

  const replacements = {
    "images/broiler.png?v=2": "images/broiler.png?v=3",
    "images/layer.png?v=2": "images/layer.png?v=3",
    "images/kadaknath.jpg?v=2": "images/kadaknath.png?v=3",
    "images/desi_rooster.jpg?v=2": "images/desi_rooster.png?v=3",
  };

  for (const [oldStr, newStr] of Object.entries(replacements)) {
    html = html.split(oldStr).join(newStr);
  }

  fs.writeFileSync(filename, html);
  console.log("Image references updated in " + filename);
}

updateImageRefs("index.html");
