const fs = require('fs');

function swapTabs() {
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. Swap the buttons in the Header
    // The buttons block starts after:
    // <!-- Tabs Header -->
    //       <div ...>
    
    // We will find the buttons using a simple regex since their text is known.
    // However, they are currently formatted across multiple lines by Prettier.
    // The easiest way is to find the two buttons, extract them, and rebuild the container.
    
    // To do this robustly without parsing DOM:
    // Let's modify switchHfTab first:
    const oldSwitch = `if (tab === "faq") {
          btns[0].style.opacity = "1";
          btns[0].style.borderBottom = "3px solid #86efac";
          document.getElementById("hf-faq").style.display = "block";
        } else {
          btns[1].style.opacity = "1";
          btns[1].style.borderBottom = "3px solid #7dd3fc";
          document.getElementById("hf-feedback").style.display = "block";
        }`;
        
    const newSwitch = `if (tab === "feedback") {
          btns[0].style.opacity = "1";
          btns[0].style.borderBottom = "3px solid #7dd3fc";
          document.getElementById("hf-feedback").style.display = "block";
        } else {
          btns[1].style.opacity = "1";
          btns[1].style.borderBottom = "3px solid #86efac";
          document.getElementById("hf-faq").style.display = "block";
        }`;
    
    html = html.replace(oldSwitch, newSwitch);

    // 2. Change their initial state classes and opacities in HTML
    // FAQ Button: currently has "hf-tab-btn active" and opacity 1 and border-bottom: 3px solid #86efac
    // Feedback Button: currently has "hf-tab-btn" and opacity 0.6 and border-bottom: 3px solid transparent

    // We will swap their order in the HTML as well. 
    // Since Prettier formats it, I'll use cheerio to make it safe.
}

swapTabs();
