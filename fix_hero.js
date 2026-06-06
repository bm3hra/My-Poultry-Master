const fs = require("fs");

function fixBugs() {
  // 1. Fix index.html placeholder image
  let html = fs.readFileSync("index.html", "utf8");
  const oldDiv = `<div style="width: 100%; height: 350px; background: rgba(255,255,255,0.1); border-radius: 20px; border: 1px solid var(--primary-alpha); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); box-shadow: 0 10px 30px var(--primary-alpha);">
                    <i class="fa-solid fa-chart-pie" style="font-size: 8rem; color: var(--primary);"></i>
                </div>`;

  const newDiv = `<div style="width: 100%; height: 350px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px var(--primary-alpha);">
                    <img src="images/hero_rooster.png" alt="Hero Rooster" style="width: 100%; height: 100%; object-fit: cover;">
                </div>`;

  html = html.replace(oldDiv, newDiv);
  fs.writeFileSync("index.html", html);
  console.log("index.html updated");

  // 2. Fix script.js reveal animation
  let js = fs.readFileSync("script.js", "utf8");
  js = js.replace(
    "document.querySelectorAll('.reveal-up');",
    "document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');",
  );
  fs.writeFileSync("script.js", js);
  console.log("script.js updated");
}

fixBugs();
