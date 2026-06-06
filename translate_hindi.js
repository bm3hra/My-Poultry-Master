const fs = require("fs");

function translateFile(filename) {
  let html = fs.readFileSync(filename, "utf8");

  const replacements = {
    "Batch & FCR Management": "बैच और दाने का हिसाब (FCR)",
    "अपने बैच का फीड कंजम्पशन": "अपने बैच के दाने की खपत",
    "Disease & Mortality Alert": "बीमारी और मृत्यु की चेतावनी",
    "मोर्टलिटी होने पर रेड अलर्ट (Red Alert) पाएं":
      "मृत्यु होने पर तुरंत खतरे की चेतावनी (Red Alert) पाएं",
    "Egg Production & Incubation": "अंडा उत्पादन और हैचरी",
    "Poultry Marketplace": "पोल्ट्री मंडी (खरीद-बिक्री)",
    "<b>Chicks, Broilers, Layers, Feed</b> और <b>Equipment</b>":
      "<b>चूजे, ब्रॉयलर, लेयर मुर्गी, दाना</b> और <b>उपकरण (बर्तन)</b>",
    "1. Profit Calculator": "1. मुनाफा कैलकुलेटर",
    "2. FCR Calculator": "2. दाने का हिसाब (FCR)",
    "3. Mortality Calculator": "3. मृत्यु दर कैलकुलेटर",
    "4. Feed Cost Calculator": "4. दाना खर्च कैलकुलेटर",
    "5. Water Requirement": "5. पानी की जरूरत",
    "6. Egg Production %": "6. अंडा उत्पादन %",
    "7. Feed Per Egg": "7. प्रति अंडा दाना खर्च",
    "8. Vaccine Reminder": "8. टीकाकरण कैलेंडर",
    "9. ROI Calculator": "9. लागत और मुनाफा (ROI)",
    ">Calculate<": ">हिसाब लगाएं<",
    ">Generate Schedule<": ">शेड्यूल बनाएं<",
  };

  for (const [eng, hin] of Object.entries(replacements)) {
    html = html.split(eng).join(hin);
  }

  fs.writeFileSync(filename, html);
  console.log(filename + " translated");
}

translateFile("index.html");
