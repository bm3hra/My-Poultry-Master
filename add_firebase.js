const fs = require('fs');
const cheerio = require('cheerio');

async function addFirebase() {
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. We will use standard string replacement for the scripts because they are in the <script> block at the end.
    // The `<script>` block currently ends before `</body>`.
    
    // First, let's replace submitFeedback function
    const oldSubmitFeedback = `function submitFeedback() {
        if (currentRating === 0) {
          alert("कृपया रेटिंग (Stars) चुनें!");
          return;
        }
        alert(
          "धन्यवाद! आपका फीडबैक सफलतापूर्वक प्राप्त हो गया है। Firebase कनेक्ट होने पर यह डेटाबेस में सेव हो जाएगा।",
        );
        setRating(0);
        document
          .querySelectorAll("#hf-feedback input, #hf-feedback textarea")
          .forEach((el) => (el.value = ""));
      }`;
      
    const newSubmitFeedback = `async function submitFeedback() {
        if (currentRating === 0) {
          alert("कृपया रेटिंग (Stars) चुनें!");
          return;
        }
        
        const name = document.getElementById('fbName').value;
        const phone = document.getElementById('fbPhone').value;
        const msg = document.getElementById('fbMsg').value;
        
        try {
            await firestoreDB.collection('feedback').add({
                name: name,
                phone: phone,
                message: msg,
                rating: currentRating,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert("धन्यवाद! आपका फीडबैक हमारे डेटाबेस में सुरक्षित हो गया है।");
            setRating(0);
            document.querySelectorAll("#hf-feedback input, #hf-feedback textarea").forEach((el) => (el.value = ""));
        } catch (e) {
            console.error(e);
            alert("फीडबैक भेजने में समस्या आई।");
        }
      }`;
      
    html = html.replace(oldSubmitFeedback, newSubmitFeedback);
    
    // Add registerFarm function right after submitFeedback
    const registerFunc = `
      async function registerFarm() {
          const name = document.getElementById('regName').value;
          const phone = document.getElementById('regPhone').value;
          const type = document.getElementById('regType').value;
          
          if(!name || !phone) {
              alert("कृपया नाम और मोबाइल नंबर भरें!");
              return;
          }
          
          try {
              await firestoreDB.collection('farmers').add({
                  name: name,
                  phone: phone,
                  farmType: type,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
              });
              alert('बधाई हो! आपका फार्म सफलतापूर्वक रजिस्टर हो गया है।');
              document.getElementById('registerModal').style.display='none';
              window.location.href='dashboard.html';
          } catch(e) {
              console.error(e);
              alert("रजिस्टर करने में समस्या आई।");
          }
      }
    `;
    
    html = html.replace('function toggleMenu() {', registerFunc + '\n      function toggleMenu() {');

    // Add Firebase SDK scripts before the main script tag
    const firebaseScripts = `
    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script>
      const firebaseConfig = {
        apiKey: "AIzaSyAOyx7jsknPhrAiBlaDz5sy5ezhraLdgRI",
        authDomain: "my-poultry-master-46063.firebaseapp.com",
        projectId: "my-poultry-master-46063",
        storageBucket: "my-poultry-master-46063.firebasestorage.app",
        messagingSenderId: "955775078104",
        appId: "1:955775078104:android:f5a48724277d07b25091ad"
      };
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
      }
      const firestoreDB = firebase.firestore();
    </script>
    `;
    
    html = html.replace('<script>', firebaseScripts + '\n    <script>');

    // Now load with Cheerio to add IDs and change onclicks
    const $ = cheerio.load(html, { decodeEntities: false });
    
    // Add IDs to Feedback inputs
    const fbInputs = $('#hf-feedback input');
    $(fbInputs[0]).attr('id', 'fbName');
    $(fbInputs[1]).attr('id', 'fbPhone');
    $('#hf-feedback textarea').attr('id', 'fbMsg');

    // Add IDs to Register Modal inputs
    const regModal = $('#registerModal');
    const regInputs = regModal.find('input');
    $(regInputs[0]).attr('id', 'regName');
    $(regInputs[1]).attr('id', 'regPhone');
    const regSelect = regModal.find('select');
    regSelect.attr('id', 'regType');
    
    // Update Register button onclick
    const regBtn = regModal.find('button');
    regBtn.attr('onclick', 'registerFarm()');
    
    fs.writeFileSync('index.html', $.html());
    console.log("Firebase added successfully!");
}

addFirebase();
