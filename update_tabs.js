const fs = require("fs");

function updateTabs() {
  let html = fs.readFileSync("index.html", "utf8");

  // 1. Replace the buttons
  const oldButtonsBlock = `<div style="display: flex; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <button class="hf-tab-btn active" onclick="switchHfTab('faq')" style="flex: 1; padding: 20px; font-size: 1.1rem; font-weight: bold; border: none; background: transparent; cursor: pointer; color: var(--primary-dark); transition: 0.3s; border-bottom: 3px solid var(--primary);">
                        <i class="fa-solid fa-circle-question"></i> अक्सर पूछे जाने वाले सवाल (FAQ)
                    </button>
                    <button class="hf-tab-btn" onclick="switchHfTab('feedback')" style="flex: 1; padding: 20px; font-size: 1.1rem; font-weight: bold; border: none; background: transparent; cursor: pointer; color: var(--gray-500); transition: 0.3s; border-bottom: 3px solid transparent;">
                        <i class="fa-solid fa-comment-dots"></i> आपका फीडबैक
                    </button>
                </div>`;

  const newButtonsBlock = `<div style="display: flex; border-bottom: 1px solid #e2e8f0; border-radius: 20px 20px 0 0; overflow: hidden;">
                    <button class="hf-tab-btn active" onclick="switchHfTab('faq')" style="flex: 1; padding: 20px; font-size: 1.1rem; font-weight: bold; border: none; background: linear-gradient(135deg, #dcfce7, #bbf7d0); cursor: pointer; color: #166534; transition: 0.3s; border-bottom: 3px solid #86efac; opacity: 1;">
                        <i class="fa-solid fa-circle-question"></i> अक्सर पूछे जाने वाले सवाल (FAQ)
                    </button>
                    <button class="hf-tab-btn" onclick="switchHfTab('feedback')" style="flex: 1; padding: 20px; font-size: 1.1rem; font-weight: bold; border: none; background: linear-gradient(135deg, #e0f2fe, #bae6fd); cursor: pointer; color: #0369a1; transition: 0.3s; border-bottom: 3px solid transparent; opacity: 0.6;">
                        <i class="fa-solid fa-comment-dots"></i> आपका फीडबैक
                    </button>
                </div>`;

  html = html.replace(oldButtonsBlock, newButtonsBlock);

  // 2. Replace the switchHfTab function
  const oldFunc = `// Feedback & FAQ Tabs
        function switchHfTab(tab) {
            const btns = document.querySelectorAll('.hf-tab-btn');
            const contents = document.querySelectorAll('.hf-content');
            
            btns.forEach(btn => {
                btn.style.color = 'var(--gray-500)';
                btn.style.borderBottom = '3px solid transparent';
            });
            contents.forEach(content => content.style.display = 'none');
            
            if(tab === 'faq') {
                btns[0].style.color = 'var(--primary-dark)';
                btns[0].style.borderBottom = '3px solid var(--primary)';
                document.getElementById('hf-faq').style.display = 'block';
            } else {
                btns[1].style.color = 'var(--primary-dark)';
                btns[1].style.borderBottom = '3px solid var(--primary)';
                document.getElementById('hf-feedback').style.display = 'block';
            }
        }`;

  const newFunc = `// Feedback & FAQ Tabs
        function switchHfTab(tab) {
            const btns = document.querySelectorAll('.hf-tab-btn');
            const contents = document.querySelectorAll('.hf-content');
            
            btns.forEach(btn => {
                btn.style.opacity = '0.6';
                btn.style.borderBottom = '3px solid transparent';
            });
            contents.forEach(content => content.style.display = 'none');
            
            if(tab === 'faq') {
                btns[0].style.opacity = '1';
                btns[0].style.borderBottom = '3px solid #86efac';
                document.getElementById('hf-faq').style.display = 'block';
            } else {
                btns[1].style.opacity = '1';
                btns[1].style.borderBottom = '3px solid #7dd3fc';
                document.getElementById('hf-feedback').style.display = 'block';
            }
        }`;

  html = html.replace(oldFunc, newFunc);
  fs.writeFileSync("index.html", html);
  console.log("Tabs updated");
}

updateTabs();
