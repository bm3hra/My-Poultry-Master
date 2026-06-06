const fs = require("fs");
const css = `
/* Google Translate Widget Fixes */
#google_translate_element {
    background: rgba(255, 255, 255, 0.9);
    padding: 0px 8px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.goog-te-gadget {
    font-family: 'Inter', sans-serif !important;
    font-size: 0px !important; /* Hides Powered by Google text */
    color: transparent !important;
}
.goog-te-gadget .goog-te-combo {
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
    color: #065f46 !important;
    font-weight: 600 !important;
    margin: 4px 0 !important;
    padding: 4px;
    border: none !important;
    outline: none !important;
    background: transparent !important;
    cursor: pointer;
}
.goog-logo-link {
    display: none !important;
}
.goog-te-gadget img {
    display: none !important;
}
.skiptranslate iframe {
    display: none !important;
}
body {
    top: 0px !important;
}
`;
fs.appendFileSync("styles.css", css);
console.log("Added Translate CSS successfully!");
