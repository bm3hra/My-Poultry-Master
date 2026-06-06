const fs = require('fs');
const cheerio = require('cheerio');

async function swapTabs() {
    let html = fs.readFileSync('index.html', 'utf8');
    
    // First update the JS logic using string replace
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

    // Now use Cheerio to safely swap the HTML elements
    const $ = cheerio.load(html, { decodeEntities: false });

    const btnFaq = $('button[onclick="switchHfTab(\'faq\')"]');
    const btnFeedback = $('button[onclick="switchHfTab(\'feedback\')"]');
    
    // Update FAQ button styles
    btnFaq.removeClass('active');
    btnFaq.css('opacity', '0.6');
    btnFaq.css('border-bottom', '3px solid transparent');
    
    // Update Feedback button styles
    btnFeedback.addClass('active');
    btnFeedback.css('opacity', '1');
    btnFeedback.css('border-bottom', '3px solid #7dd3fc');
    
    // Swap their DOM positions (Feedback goes before FAQ)
    btnFeedback.insertBefore(btnFaq);

    // Now swap the content divs
    const contentFaq = $('#hf-faq');
    const contentFeedback = $('#hf-feedback');
    
    contentFeedback.addClass('active');
    contentFeedback.css('display', 'block');
    
    contentFaq.removeClass('active');
    contentFaq.css('display', 'none');
    
    contentFeedback.insertBefore(contentFaq);

    fs.writeFileSync('index.html', $.html());
    console.log('Tabs swapped successfully!');
}

swapTabs();
