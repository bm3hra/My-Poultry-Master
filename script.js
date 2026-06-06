document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Scroll Animation
  const reveals = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );
  const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        reveals[i].classList.add("active");
      }
    }
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // FAQ Toggle
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });

  // Counters
  const counters = document.querySelectorAll(".counter");
  const startCounters = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = 2000;
          const inc = target / (duration / 20);

          let count = 0;
          const updateCount = () => {
            count += inc;
            if (count < target) {
              counter.innerText = Math.ceil(count) + "+";
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = target + "+";
            }
          };

          counter.innerText = "0";
          updateCount();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => startCounters.observe(counter));
});

// Top 10 Poultry Calculators
function calcProfit() {
  const birds = parseFloat(document.getElementById("calc1_birds").value) || 0;
  const avgwt = parseFloat(document.getElementById("calc1_avgwt").value) || 0;
  const rate = parseFloat(document.getElementById("calc1_rate").value) || 0;
  // Assume feed cost 130 per bird + chick cost 30 + med 10 = 170 cost
  const totalWeight = birds * avgwt;
  const revenue = totalWeight * rate;
  const cost = birds * 170;
  const profit = revenue - cost;
  const res = document.getElementById("res1");
  res.style.display = "block";
  res.style.color = profit >= 0 ? "#16a34a" : "#dc2626";
  res.innerText = "₹ " + profit.toLocaleString("en-IN");
}

function calcFCR() {
  const feed = parseFloat(document.getElementById("calc2_feed").value) || 0;
  const weight = parseFloat(document.getElementById("calc2_weight").value) || 0;
  const fcr = weight > 0 ? (feed / weight).toFixed(3) : 0;
  const res = document.getElementById("res2");
  res.style.display = "block";
  res.innerText = fcr;
}

function calcMortality() {
  const total = parseFloat(document.getElementById("calc3_total").value) || 0;
  const dead = parseFloat(document.getElementById("calc3_dead").value) || 0;
  const percent = total > 0 ? ((dead / total) * 100).toFixed(2) : 0;
  const res = document.getElementById("res3");
  res.style.display = "block";
  res.innerText = percent + " %";
}

function calcFeedCost() {
  const feed = parseFloat(document.getElementById("calc4_feed").value) || 0;
  const price = parseFloat(document.getElementById("calc4_price").value) || 0;
  const birds = parseFloat(document.getElementById("calc4_birds").value) || 0;
  const costPerBird = birds > 0 ? ((feed * price) / birds).toFixed(2) : 0;
  const res = document.getElementById("res4");
  res.style.display = "block";
  res.innerText = "₹ " + costPerBird;
}

function calcWater() {
  const birds = parseFloat(document.getElementById("calc5_birds").value) || 0;
  const age = parseFloat(document.getElementById("calc5_age").value) || 0;
  // Approximation: birds * age(weeks) * 0.05
  const dailyWaterLiters = (birds * age * 0.05).toFixed(1);
  const res = document.getElementById("res5");
  res.style.display = "block";
  res.innerText = dailyWaterLiters + " Liters/Day";
}

function calcEggProduction() {
  const eggs = parseFloat(document.getElementById("calc6_eggs").value) || 0;
  const birds = parseFloat(document.getElementById("calc6_birds").value) || 0;
  const prod = birds > 0 ? ((eggs / birds) * 100).toFixed(2) : 0;
  const res = document.getElementById("res6");
  res.style.display = "block";
  res.innerText = prod + " %";
}

function calcFeedPerEgg() {
  const feed = parseFloat(document.getElementById("calc7_feed").value) || 0;
  const eggs = parseFloat(document.getElementById("calc7_eggs").value) || 0;
  const fpe = eggs > 0 ? (feed / eggs).toFixed(1) : 0;
  const res = document.getElementById("res7");
  res.style.display = "block";
  res.innerText = fpe + " Grams/Egg";
}

function calcVaccine() {
  const startDate = document.getElementById("calc8_date").value;
  const type = document.getElementById("calc8_type").value;
  const res = document.getElementById("res8");
  if (!startDate) {
    alert("कृपया तारीख चुनें");
    return;
  }
  const sDate = new Date(startDate);

  const addDays = (d, days) => {
    let nd = new Date(d);
    nd.setDate(nd.getDate() + days);
    return nd.toLocaleDateString("hi-IN");
  };

  let html = `<strong>Schedule:</strong><br>`;
  html += `Day 1: Marek's Disease (Hatchery)<br>`;
  html += `Day 5-7: Lasota ND (${addDays(sDate, 6)})<br>`;
  html += `Day 12-14: IBD Gumboro (${addDays(sDate, 13)})<br>`;
  if (type === "layer") {
    html += `Day 21: Lasota Booster (${addDays(sDate, 21)})<br>`;
    html += `Day 28: IBD Booster (${addDays(sDate, 28)})<br>`;
    html += `Week 6-8: Fowl Pox (${addDays(sDate, 49)})<br>`;
  } else {
    html += `Day 21: Lasota Booster (${addDays(sDate, 21)})<br>`;
  }
  res.style.display = "block";
  res.innerHTML = html;
}

function calcROI() {
  const inv = parseFloat(document.getElementById("calc9_inv").value) || 0;
  const profit = parseFloat(document.getElementById("calc9_profit").value) || 0;
  const roi = inv > 0 ? ((profit / inv) * 100).toFixed(2) : 0;
  const res = document.getElementById("res9");
  res.style.display = "block";
  res.innerText = roi + " %";
}

function calcDisease() {
  const symp = document.getElementById("calc10_symp").value;
  const res = document.getElementById("res10");
  let text = "";
  if (symp === "crd")
    text =
      "<strong>संभावित: CRD (Chronic Respiratory Disease)</strong><br>उपचार: पानी में Tylan/Enrofloxacin दें। शेड में वेंटिलेशन सुधारें।";
  else if (symp === "nd")
    text =
      "<strong>संभावित: Ranikhet / ND (Newcastle Disease)</strong><br>उपचार: यह एक वायरल बीमारी है। बचाव ही इलाज है। पानी में मल्टी-विटामिन और इम्युनिटी बूस्टर दें।";
  else if (symp === "ibd")
    text =
      "<strong>संभावित: Gumboro (IBD)</strong><br>उपचार: बायोसियूरिटी बढ़ाएं। पानी में इलेक्ट्रोलाइट्स और विटामिन ई-सेलेनियम दें।";
  else if (symp === "cocc")
    text =
      "<strong>संभावित: Coccidiosis (खूनी दस्त)</strong><br>उपचार: Amprolium या Toltrazuril पानी में दें। लिटर (बिछावन) को सूखा रखें।";

  res.style.display = "block";
  res.innerHTML = text;
}

// AI Chatbot Logic
let isChatOpen = false;
window.toggleChat = function () {
  const chatWindow = document.getElementById("chat-window");
  const chatBtn = document.getElementById("chat-toggle-btn");
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatWindow.style.display = "flex";
    chatBtn.style.display = "none";
  } else {
    chatWindow.style.display = "none";
    chatBtn.style.display = "flex";
  }
};

window.handleChatSubmit = async function (e) {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const userMsg = input.value.trim();
  if (!userMsg) return;

  const messagesDiv = document.getElementById("chat-messages");

  const userDiv = document.createElement("div");
  userDiv.style.cssText = "display: flex; justify-content: flex-end;";
  userDiv.innerHTML = `<div style="max-width: 80%; padding: 10px; border-radius: 12px; border-bottom-right-radius: 2px; background: #ea580c; color: white;">${userMsg}</div>`;
  messagesDiv.appendChild(userDiv);

  input.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  const loadDiv = document.createElement("div");
  loadDiv.id = "bot-loading";
  loadDiv.style.cssText = "display: flex; justify-content: flex-start;";
  loadDiv.innerHTML = `<div style="max-width: 80%; padding: 10px; border-radius: 12px; border-bottom-left-radius: 2px; background: white; border: 1px solid #e5e7eb; color: #1f2937;">Poultry AI सोच रहा है... 🤔</div>`;
  messagesDiv.appendChild(loadDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  setTimeout(() => {
    const loading = document.getElementById("bot-loading");
    if (loading) loading.remove();

    let botResponse =
      "क्षमा करें, मेरा ज्ञान अभी सीमित है। कृपया स्पष्ट प्रश्न पूछें।";
    const lowerInput = userMsg.toLowerCase();

    const kb = [
      {
        k: [
          "बीट में दाना",
          "beet me dana",
          "digest",
          "wajan",
          "वजन",
          "कण",
          "apach",
        ],
        r: "<div style='text-align: left;'><b>लक्षण:</b> बीट में दाना आना, अपच, और 30 दिन में वजन न बढ़ना।<br><b>बीमारी:</b> इसे 'Feed Passage' या आंतों में सूजन (Enteritis) कहते हैं।<br><b>इलाज (AI सलाह):</b><br>1. पीने के पानी में 3 से 5 दिन तक <b>प्रोबायोटिक (Probiotics)</b> और अच्छा <b>लिवर टॉनिक (जैसे Brotone)</b> चलाएं।<br>2. पानी में <b>एसिडिफायर (Acidifier)</b> मिलाएं जिससे पाचन तंत्र ठीक हो सके।<br>3. दाने में फंगस/टॉक्सिन हो सकता है, इसलिए <b>टॉक्सिन बाइंडर</b> का उपयोग करें।</div>",
      },
      {
        k: ["बुखार", "बीमार", "तापमान", "गर्म"],
        r: "पोल्ट्री में बुखार के लिए तुरंत पानी में मल्टी-विटामिन और पेरासिटामोल दें। शेड का वेंटिलेशन चेक करें।",
      },
      {
        k: ["दस्त", "पतली बीट", "खूनी", "coccidiosis"],
        r: "लाल/खूनी दस्त Coccidiosis के लक्षण हैं। पानी में Amprolium या Toltrazuril दवा 3-5 दिन तक दें। बिछावन (लिटर) सूखा रखें।",
      },
      {
        k: ["दाना", "feed", "एफसीआर", "fcr"],
        r: "ब्रॉयलर के अच्छे FCR के लिए प्री-स्टार्टर, स्टार्टर और फिनिशर दाना सही समय पर दें। फीडर की ऊंचाई मुर्गियों के सीने के बराबर रखें।",
      },
      {
        k: ["अंडा", "लेयर", "egg"],
        r: "लेयर मुर्गियों में अंडे का उत्पादन बढ़ाने के लिए दिन में 16 घंटे रोशनी (Light) और कैल्शियम सप्लीमेंट दें।",
      },
      {
        k: ["टीका", "vaccine", "रानीखेत", "गम्बोरो"],
        r: "रानीखेत (ND) का पहला टीका 5-7 दिन पर (Lasota) और गम्बोरो (IBD) का 12-14 दिन पर दें। वैक्सीन हमेशा ठंडे समय में दें।",
      },
      {
        k: ["शेड", "space", "जगह"],
        r: "एक ब्रॉयलर मुर्गी को कम से कम 1.2 से 1.5 स्क्वायर फुट जगह चाहिए। गर्मियों में यह जगह 10-20% बढ़ा दें।",
      },
    ];

    for (let i = 0; i < kb.length; i++) {
      if (kb[i].k.some((kw) => lowerInput.includes(kw))) {
        botResponse = kb[i].r;
        break;
      }
    }

    const botDiv = document.createElement("div");
    botDiv.style.cssText = "display: flex; justify-content: flex-start;";
    botDiv.innerHTML = `<div style="max-width: 80%; padding: 10px; border-radius: 12px; border-bottom-left-radius: 2px; background: white; border: 1px solid #e5e7eb; color: #1f2937;">${botResponse}</div>`;
    messagesDiv.appendChild(botDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 1000);
};

// Service Worker for Offline Capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("ServiceWorker registered"))
      .catch((err) => console.log("ServiceWorker registration failed: ", err));
  });
}
