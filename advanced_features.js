// advanced_features.js - Implementation of Premium Farm ERP Features

// 1. Dashboard Logic
async function updateDashboardStats() {
  try {
    const goats = await getAllRecords("goats");
    const ledger = await getAllRecords("ledger");

    let totalGoats = goats.length;
    let pregnantGoats = goats.filter((g) => g.status === "pregnant");
    let pregnant = pregnantGoats.length;

    document.getElementById("dashTotalGoats").innerText = totalGoats || "0";
    document.getElementById("dashPregnant").innerText = pregnant || "0";

    // Calculate Deliveries within 30 days
    let deliveries30Days = 0;
    const todayMs = Date.now();
    pregnantGoats.forEach((g) => {
      if (g.matingDate) {
        const matingMs = new Date(g.matingDate).getTime();
        const dueMs = matingMs + 150 * 24 * 60 * 60 * 1000; // 150 days gestation
        const diffDays = (dueMs - todayMs) / (1000 * 60 * 60 * 24);
        if (diffDays >= 0 && diffDays <= 30) {
          deliveries30Days++;
        }
      }
    });
    document.getElementById("dashDelivery").innerText = deliveries30Days || "0";

    // Vaccines upcoming (mocked logic or real logic if we check dates)
    // For now, if we have passport entries, we can check. For demo, we leave it simple or 0.
    // Let's just say 0 unless we have complex schedule logic.
    const passports = await getAllRecords("passport");
    document.getElementById("dashVaccines").innerText =
      passports.length > 0 ? passports.length : "0";

    let todayIncome = 0;
    let todayMilk = 0;

    const todayStr = new Date().toISOString().split("T")[0];

    ledger.forEach((entry) => {
      if (entry.date === todayStr) {
        if (entry.type === "income") todayIncome += entry.amount;
        if (entry.type === "milk") todayMilk += entry.amount;
      }
    });

    document.getElementById("dashIncome").innerText = "₹" + todayIncome;
    document.getElementById("dashMilk").innerText = todayMilk.toFixed(1);
  } catch (e) {
    console.error("Failed to update dashboard", e);
  }
}

// Update dashboard on load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(updateDashboardStats, 1000); // Wait for DB to init
});

// 2. AI Voice Assistant Logic
function toggleAIVoice() {
  const btnText = document.getElementById("aiVoiceBtnText");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "माफ़ करें, आपका ब्राउज़र वॉइस फीचर सपोर्ट नहीं करता। (Voice recognition not supported)",
    );
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "hi-IN"; // Hindi
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = function () {
    btnText.innerText = "सुन रहा हूँ...";
    document.getElementById("aiVoiceBtn").style.backgroundColor = "#ef4444"; // Red
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Farmer said: ", transcript);
    btnText.innerText = "प्रोसेसिंग...";

    // Simple AI Logic (Mocking the AI responses based on keywords)
    let replyText = "मुझे समझ नहीं आया। कृपया दोबारा कहें।";

    if (transcript.includes("खाना नहीं") || transcript.includes("चारा नहीं")) {
      replyText =
        "अगर बकरी चारा नहीं खा रही है, तो शायद उसे पेट की समस्या या बुखार हो सकता है। कृपया उसका तापमान चेक करें और डॉक्टर को बुलाएं।";
    } else if (transcript.includes("टीका") || transcript.includes("वैक्सीन")) {
      replyText =
        "मानसून से पहले फड़किया का टीका सबसे ज़रूरी है। अगर नहीं लगा है, तो तुरंत लगवाएं।";
    } else if (transcript.includes("वजन") || transcript.includes("कमजोर")) {
      replyText =
        "बकरी का वजन बढ़ाने के लिए उसे चने की चूरी और सरसों की खली मिलाकर दाना दें।";
    } else if (
      transcript.includes("नमस्ते") ||
      transcript.includes("राम राम")
    ) {
      replyText =
        "राम राम सा! मैं आपका डिजिटल सहायक हूँ, बताइये मैं आपकी क्या मदद करूँ?";
    }

    speakHindi(replyText);
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error", event.error);
    btnText.innerText = "AI Voice Assistant";
    document.getElementById("aiVoiceBtn").style.backgroundColor = "#8b5cf6";
    alert("आवाज नहीं सुन पाया। कृपया फिर से कोशिश करें।");
  };

  recognition.onend = function () {
    btnText.innerText = "AI Voice Assistant";
    document.getElementById("aiVoiceBtn").style.backgroundColor = "#8b5cf6";
  };

  recognition.start();
}

function speakHindi(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;

    // Show visual feedback
    alert("AI जवाब: " + text);

    window.speechSynthesis.speak(utterance);
  } else {
    alert("AI जवाब: " + text);
  }
}

// 3. Goat Pedigree Tracker Logic
function savePedigree() {
  const name = document.getElementById("pedigreeName").value;
  const sire = document.getElementById("pedigreeSire").value || "Unknown";
  const dam = document.getElementById("pedigreeDam").value || "Unknown";

  if (!name) {
    alert("कृपया बकरी/बकरे का नाम दर्ज करें");
    return;
  }

  const wrapper = document.getElementById("pedigreeTreeWrapper");
  const display = document.getElementById("pedigreeTreeDisplay");

  // Draw ASCII Tree
  display.innerHTML = `
${name}<br>
├── पिता: ${sire}<br>
└── माता: ${dam}<br>
    `;

  wrapper.style.display = "block";

  // Save to DB (mock for now, would integrate with DB)
  console.log("Saved Pedigree", { name, sire, dam });
}

// 4. Goat Growth Tracker Logic
function saveGrowthRecord() {
  const goatId = document.getElementById("growthGoatId").value;
  const month = parseInt(document.getElementById("growthMonth").value);
  const weight = parseFloat(document.getElementById("growthWeight").value);

  if (!goatId || isNaN(month) || isNaN(weight)) {
    alert("कृपया सभी जानकारी सही से भरें");
    return;
  }

  const wrapper = document.getElementById("growthChartWrapper");
  const display = document.getElementById("growthChartDisplay");
  const alertMsg = document.getElementById("growthAlertMsg");

  // Generate bars dynamically (mocking previous months for visual effect)
  let barsHTML = "";
  const mockData = [
    { m: "जन्म", w: 3 },
    { m: "1 माह", w: 6 },
    { m: "2 माह", w: 9 },
  ];

  let maxWeight = Math.max(weight, 15); // for scaling

  // Add mock history
  mockData.forEach((d) => {
    let height = (d.w / maxWeight) * 100;
    barsHTML += `<div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 5px;">
            <span style="font-size: 0.8rem; color: #0284c7;">${d.w}kg</span>
            <div style="width: 100%; height: ${height}%; background: #bae6fd; border-radius: 5px 5px 0 0;"></div>
            <span style="font-size: 0.7rem; color: #64748b;">${d.m}</span>
        </div>`;
  });

  // Add current entry
  let height = (weight / maxWeight) * 100;
  barsHTML += `<div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 5px;">
        <span style="font-size: 0.8rem; color: #0369a1; font-weight:bold;">${weight}kg</span>
        <div style="width: 100%; height: ${height}%; background: #0284c7; border-radius: 5px 5px 0 0;"></div>
        <span style="font-size: 0.7rem; color: #334155; font-weight:bold;">${month} माह</span>
    </div>`;

  display.innerHTML = barsHTML;

  // Alert logic
  let expectedWeight = month * 3 + 3; // roughly 3kg birth + 3kg/month
  if (weight < expectedWeight - 2) {
    alertMsg.innerText =
      "⚠️ अलर्ट: वजन वृद्धि सामान्य से कम है। कृपया चारा और डिवर्मिंग चेक करें।";
    alertMsg.style.color = "#dc2626";
  } else {
    alertMsg.innerText = "✅ वृद्धि बिल्कुल सही है!";
    alertMsg.style.color = "#16a34a";
  }

  wrapper.style.display = "block";
}

// 5. AI Feed Formulator Logic
function calculateAIFeed() {
  const bajra = parseFloat(document.getElementById("feedBajra").value) || 0;
  const makka = parseFloat(document.getElementById("feedMakka").value) || 0;
  const chana = parseFloat(document.getElementById("feedChana").value) || 0;
  const sarso = parseFloat(document.getElementById("feedSarso").value) || 0;

  const totalQty = bajra + makka + chana + sarso;
  if (totalQty === 0) {
    alert("कृपया कम से कम एक सामग्री दर्ज करें");
    return;
  }

  // Approximate CP (Crude Protein) %
  // Bajra: 11%, Makka: 9%, Chana: 18%, Sarso: 35%
  const cp = (bajra * 11 + makka * 9 + chana * 18 + sarso * 35) / totalQty;

  // Approximate TDN (Total Digestible Nutrients) %
  // Bajra: 75%, Makka: 82%, Chana: 70%, Sarso: 73%
  const tdn = (bajra * 75 + makka * 82 + chana * 70 + sarso * 73) / totalQty;

  document.getElementById("feedProteinResult").innerText = cp.toFixed(1) + "%";
  document.getElementById("feedEnergyResult").innerText = tdn.toFixed(1) + "%";

  const advice = document.getElementById("feedAiAdvice");
  if (cp < 14) {
    advice.innerHTML =
      "⚠️ <strong>प्रोटीन बहुत कम है:</strong> गाभिन या बढ़ते बच्चों के लिए कम से कम 16% प्रोटीन चाहिए। कृपया सरसों की खली या चने की मात्रा बढ़ाएं।";
    advice.style.color = "#b91c1c";
  } else if (cp > 20) {
    advice.innerHTML =
      "⚠️ <strong>प्रोटीन बहुत ज्यादा है:</strong> यह राशन महंगा पड़ेगा। मक्का या बाजरा बढ़ाएं।";
    advice.style.color = "#b91c1c";
  } else {
    advice.innerHTML =
      "✅ <strong>संतुलित राशन:</strong> यह एक बहुत ही अच्छा और संतुलित राशन है।";
    advice.style.color = "#15803d";
  }

  document.getElementById("feedResultWrapper").style.display = "block";
}

// 6. Goat Health Passport Logic
function viewHealthPassport() {
  const goatId = document.getElementById("passportGoatId").value;
  if (!goatId) {
    alert("कृपया बकरी की ID दर्ज करें");
    return;
  }

  const wrapper = document.getElementById("passportResultWrapper");

  // For MVP, we simulate fetching data. In real app, fetch from IndexedDB
  document.getElementById("passportName").innerText = "बकरी: " + goatId;
  document.getElementById("passportIdTag").innerText =
    "ID: " + goatId.toUpperCase();

  // Randomize some data for demo effect
  document.getElementById("passportVax").innerHTML =
    "PPR (<span style='color:green'>Done</span>), FMD (<span style='color:orange'>Due Next Month</span>)";
  document.getElementById("passportDeworm").innerText =
    "Fenbendazole (20 दिन पहले)";
  document.getElementById("passportWeight").innerText =
    (Math.random() * 20 + 15).toFixed(1) + " Kg";
  document.getElementById("passportBreeding").innerText = "Not Pregnant / Open";

  wrapper.style.display = "block";
}

// --- Modal & Data Entry Logic ---
window.openModal = function (id) {
  const modal = document.getElementById(id);
  modal.classList.add("show");
  // Set default dates if empty
  const dateInputs = modal.querySelectorAll('input[type="date"]');
  dateInputs.forEach((inp) => {
    if (!inp.value) inp.value = new Date().toISOString().split("T")[0];
  });
};

window.closeModal = function (id) {
  document.getElementById(id).classList.remove("show");
};

window.saveGoatData = async function () {
  const id = document.getElementById("goatIdInput").value;
  const status = document.getElementById("goatStatusInput").value;
  const matingDate = document.getElementById("goatMatingDate").value;
  if (!id) return alert("पशु ID दर्ज करें");

  await addRecord("goats", {
    id: id + "_" + Date.now(),
    goatId: id,
    status: status,
    matingDate: status === "pregnant" ? matingDate : null,
    addedOn: new Date().toISOString(),
  });
  closeModal("goatModal");
  updateDashboardStats();
  showToast("पशु सफलतापूर्वक जोड़ा गया!");
};

window.saveVaccineData = async function () {
  const goatId = document.getElementById("vaxGoatId").value || "All";
  const vaxName = document.getElementById("vaxName").value;
  const date = document.getElementById("vaxDate").value;

  // Using passport store for health records
  await addRecord("passport", {
    id: Date.now().toString(),
    goatId: goatId,
    type: "vaccine",
    vaxName: vaxName,
    date: date,
  });
  closeModal("vaccineModal");
  updateDashboardStats();
  showToast("टीकाकरण रिकॉर्ड सेव हो गया!");
};

window.saveMilkData = async function () {
  const date = document.getElementById("milkDate").value;
  const qty = parseFloat(document.getElementById("milkQty").value);
  if (!qty) return alert("दूध की मात्रा दर्ज करें");

  // Save milk as an income/ledger entry or custom record.
  // For now we add it to ledger as 'milk' type so we can calculate total milk.
  await addRecord("ledger", {
    id: Date.now().toString(),
    type: "milk",
    amount: qty, // reusing amount field for quantity
    date: date,
    note: "Daily Milk",
  });
  closeModal("milkModal");
  updateDashboardStats();
  showToast("दूध का रिकॉर्ड सेव हो गया!");
};

window.saveLedgerData = async function () {
  const type = document.getElementById("ledgerType").value;
  const amount = parseFloat(document.getElementById("ledgerAmount").value);
  const note = document.getElementById("ledgerNote").value;
  const date = new Date().toISOString().split("T")[0];

  if (!amount) return alert("राशि दर्ज करें");

  await addRecord("ledger", {
    id: Date.now().toString(),
    type: type,
    amount: amount,
    note: note,
    date: date,
  });
  closeModal("ledgerModal");
  updateDashboardStats();
  showToast("लेज़र में सेव हो गया!");
};

function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.style.cssText =
    "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#0f172a; color:white; padding:12px 24px; border-radius:30px; z-index:10000; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); transition: opacity 0.3s;";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
