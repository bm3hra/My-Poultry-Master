const fs = require("fs");

function refineHindi(filename) {
  let html = fs.readFileSync(filename, "utf8");

  const replacements = {
    "रोज़ाना ट्रैक करें": "रोज़ाना हिसाब रखें",
    "बीमारियों (CRD, Ranikhet)": "बीमारियों (जैसे CRD, रानीखेत)",
    "अंडा उत्पादन (Hen-Day %)": "अंडा उत्पादन (प्रतिशत में)",
    "इन्क्यूबेशन (Incubation) कैलेंडर": "मशीन (इन्क्यूबेशन) कैलेंडर",
  };

  for (const [eng, hin] of Object.entries(replacements)) {
    html = html.split(eng).join(hin);
  }

  fs.writeFileSync(filename, html);
  console.log(filename + " refined");
}

refineHindi("index.html");
