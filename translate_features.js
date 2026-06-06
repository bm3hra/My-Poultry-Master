const fs = require("fs");
let c = fs.readFileSync("index.html", "utf8");

const replacements = {
  "Learn about Sirohi, Barbari, Beetal, and other top breeds. Know which breed suits your climate and budget best.":
    "सिरोही, बरबरी, बीटल और दूसरी अच्छी नस्लों के बारे में जानें। पता करें कि आपके मौसम और बजट के हिसाब से कौन सी बकरी सबसे अच्छी है।",
  "Never miss a vaccination. Get smart reminders for PPR, FMD, and ET vaccines to keep your herd healthy.":
    "अब सुई (टीका) लगाना कभी नहीं भूलेंगे। अपनी बकरियों को बीमारियों से बचाने के लिए सही समय पर फोन पर अलर्ट पाएं।",
  "Calculate your ROI. Track expenses on feed, medicine, and infrastructure versus your projected sales.":
    "अपने मुनाफे का हिसाब लगाएं। चारे, दवाई और बाड़े के खर्चे को लिखकर अपनी कुल कमाई का पता करें।",
  "Balanced diet plans for kids, pregnant goats, and meat-producing goats. Optimize weight gain scientifically.":
    "छोटे बच्चों, गाभिन बकरियों और मीट वाली बकरियों के लिए सही चारा-पानी। उनका वजन तेजी से और सही तरीके से बढ़ाएं।",
};

for (const [eng, hin] of Object.entries(replacements)) {
  c = c.split(eng).join(hin);
}

fs.writeFileSync("index.html", c);
console.log("Feature descriptions translated!");
