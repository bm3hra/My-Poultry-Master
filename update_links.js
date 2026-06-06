const fs = require("fs");

function updateLinks() {
  let html = fs.readFileSync("index.html", "utf8");

  // Replace href="#downloadApp" with the actual link, and add target="_blank"
  // To be safe, we will just replace the exact known string from earlier
  const targetUrl =
    "https://play.google.com/store/apps/dev?id=7882651542675618933";

  // Using a regex to replace any href that matches #downloadApp
  html = html.replace(
    /href="#downloadApp"/g,
    `href="${targetUrl}" target="_blank"`,
  );

  fs.writeFileSync("index.html", html);
  console.log("App download links updated to target URL.");
}

updateLinks();
