const fs = require("fs");
let c = fs.readFileSync("index.html", "utf8");

const replacements = {
  "Home</a></li>": "होम (शुरुआत)</a></li>",
  "Features</a></li>": "फ़ायदे</a></li>",
  "About App</a></li>": "ऐप के बारे में</a></li>",
  "Tools</a></li>": "कैलकुलेटर्स</a></li>",
  "Gallery</a></li>": "फोटो गैलरी</a></li>",
  "Videos</a></li>": "वीडियो</a></li>",
  "FAQ</a></li>": "आम सवाल</a></li>",
  "Get App</a>": "ऐप डाउनलोड करें</a>",
  "The ultimate pocket guide for Goat Farming. Manage breeds, track vaccination schedules, and calculate your profits effortlessly.":
    "बकरी पालन की पूरी जानकारी अब आपके फोन में। बकरियों की नस्ल, सुई (टीका) का समय, और फायदे का हिसाब सब कुछ आसानी से रखें।",
  "Download Now": "अभी डाउनलोड करें",
  "Watch Demo": "वीडियो देखें",
  "Happy Farmers": "खुशहाल किसान",
  "User Rating": "ऐप की रेटिंग",
  'See It In <span class="text-gradient">Action</span>':
    'ऐप कैसे काम करता है, <span class="text-gradient">यहाँ देखें</span>',
  "Watch how our app transforms traditional goat farming into a modern, profitable business.":
    "देखें कैसे यह ऐप आपके पुराने तरीके को बदलकर ज्यादा कमाई वाला बिज़नेस बनाता है।",
  'Farm <span class="text-gradient">Gallery</span>':
    'फार्म की <span class="text-gradient">फोटो</span>',
  "Glimpses of successful goat farms and high-quality breeds managed using our platform.":
    "हमारे ऐप का उपयोग करके सफल बकरी फार्म और अच्छी नस्लों की कुछ तस्वीरें।",
  "Healthy Herd": "स्वस्थ बकरियां",
  "App Interface": "ऐप की फोटो",
  "Farm Setup": "फार्म कैसा होना चाहिए",
  "Diet Management": "चारा-पानी का हिसाब",
  'What Farmers <span class="text-gradient">Say</span>':
    'किसानों का <span class="text-gradient">क्या कहना है</span>',
  "Real feedback from thousands of farmers who revolutionized their business.":
    "हजारों किसानों ने इसे इस्तेमाल किया और उन्हें बहुत फायदा हुआ।",
  "Profit calculator makes it so easy to understand my monthly expenses and expected returns. Highly recommended!":
    "मुनाफा कैलकुलेटर से खर्चे और कमाई का हिसाब लगाना बहुत आसान हो गया है। हर किसान को यह ऐप चलाना चाहिए!",
  "Share Your Feedback": "अपनी बात हमें बताएं",
  "Your Name": "आपका नाम",
  "Your Email": "आपका ईमेल (वैकल्पिक)",
  "Your Message or Suggestion": "आप क्या कहना चाहते हैं",
  "Send Feedback": "मैसेज भेजें",
  'Frequently Asked <span class="text-gradient">Questions</span>':
    'किसानों के <span class="text-gradient">आम सवाल</span>',
  "Got questions? We have answers.":
    "आपके मन में कोई सवाल है? यहाँ जवाब पढ़ें।",
  "Which goat breed is best for beginners?":
    "नए किसानों के लिए कौन सी बकरी पालना सबसे अच्छा है?",
  "For beginners in India, breeds like Sirohi and Barbari are generally recommended due to their high adaptability to various climates and good disease resistance.":
    'नए किसानों को "सिरोही" या "बरबरी" बकरी पालनी चाहिए। ये बकरियां कम बीमार पड़ती हैं और किसी भी मौसम में आराम से रह लेती हैं।',
  "How does the vaccination alert work?":
    "सुई (टीका) लगाने का अलर्ट कैसे काम करता है?",
  "Once you enter your goat's age or birth date in the app, it automatically generates a calendar and sends push notifications to your phone before any scheduled vaccination is due.":
    "आप बस बकरी की उम्र ऐप में डालें। जब भी सुई लगाने का समय आएगा, आपके फोन पर मैसेज आ जाएगा।",
  "Ready to transform your farm?":
    "क्या आप अपना मुनाफा बढ़ाने के लिए तैयार हैं?",
  "Join thousands of farmers making smarter decisions every day with Bakri Palan.":
    "हजारों किसानों की तरह आप भी इस ऐप का इस्तेमाल करें और फायदे में रहें।",
  "Get it on Google Play": "Google Play से ऐप डाउनलोड करें",
  "Empowering farmers with technology.": "तकनीक के साथ किसानों को आगे बढ़ाना।",
  "Quick Links": "जरूरी लिंक",
  "Connect With Us": "हमसे जुड़ें",
};

for (const [eng, hin] of Object.entries(replacements)) {
  c = c.split(eng).join(hin);
}

fs.writeFileSync("index.html", c);
console.log("Translation complete!");
