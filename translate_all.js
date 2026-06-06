const fs = require("fs");
let c = fs.readFileSync("index.html", "utf8");

const replacements = {
  'Why Choose <span class="text-gradient">Bakri Palan?</span>':
    'हमें ही <span class="text-gradient">क्यों चुनें?</span>',
  "We provide data-driven insights to manage your goat farm efficiently and maximize your profits.":
    "हम आपको सही जानकारी देते हैं जिससे आप अपने बकरी फार्म को आसानी से चला सकें और ज्यादा से ज्यादा मुनाफा कमा सकें।",
  'Bakri Palan <span class="text-gradient">Super Tools</span>':
    'बकरी पालन <span class="text-gradient">सुपर टूल्स</span>',
  "34+ Advanced AI & Scientific Calculators for your Goat Farm":
    "आपके फार्म के लिए 34 से ज्यादा आधुनिक और आसान कैलकुलेटर",
  "Track Profits": "कमाई का हिसाब",
  "Health Alerts": "बीमारी से बचाव",
  "Bakri Palan - Best Goat Farming App in India":
    "बकरी पालन - भारत का सबसे अच्छा ऐप",
  "Start your successful goat farming journey with Bakri Palan App. Get expert tips on Sirohi breeds, vaccination schedules, profit calculators, and daily guidance.":
    "बकरी पालन ऐप के साथ अपने व्यवसाय की सफल शुरुआत करें। सिरोही नस्ल, टीकाकरण का समय, और मुनाफे की गणना करने की पूरी जानकारी पाएं।",
};

for (const [eng, hin] of Object.entries(replacements)) {
  c = c.split(eng).join(hin);
}

fs.writeFileSync("index.html", c);
console.log("Final missing translations completed!");
