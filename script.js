document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    // Configuration
    const CONFIG = {
        locationId: "l82KH9dQABB0801TlZAw",
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY",
        phoneSelector: "#phone",
        nameSelector: "#full_name",
        emailSelector: 'input[name="email"]'
    };

    // 1. Initialisation des écouteurs d'événements
    function initEventListeners() {
        [CONFIG.phoneSelector, CONFIG.nameSelector, CONFIG.emailSelector].forEach(selector => {
            const field = document.querySelector(selector);
            if (field) {
                field.addEventListener("input", checkAndSubmitForm);
                console.log(`🔌 Écouteur activé pour : ${selector}`);
            } else {
                console.error(`❌ Champ introuvable : ${selector}`);
            }
        });

        // Bloque la soumission classique du formulaire
        const form = document.querySelector("form");
        if (form) {
            form.addEventListener("submit", function(e) {
                e.preventDefault();
                console.log("🛑 Soumission du formulaire bloquée");
                saveToGHL();
            });
        }
    }

    // 2. Fonction d'envoi à l'API
    function saveToGHL() {
        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        // Validation finale
        if (!phoneField || !nameField || !emailField) {
            console.error("❌ Champs manquants lors de l'envoi");
            return;
        }

        const phoneNumber = phoneField.value.replace(/\D/g, "");
        
        if (phoneNumber.length !== 10 || 
            !nameField.value.trim() || 
            !emailField.value.trim()) {
            console.warn("⏳ Données incomplètes pour l'envoi");
            return;
        }

        // Préparation des données
        const data = {
            "firstName": nameField.value.trim(),
            "email": emailField.value.trim(),
            "phone": phoneNumber,
            "locationId": CONFIG.locationId
        };

        console.log("🚀 Début de l'envoi à GHL", data);

        // Envoi API
        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${CONFIG.apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error(`Erreur ${response.status}`);
            return response.json();
        })
        .then(result => {
            console.log("✅ Contact sauvegardé", result);
            alert("Enregistrement réussi !");
        })
        .catch(error => {
            console.error("❌ Erreur API", error);
            alert("Échec de l'enregistrement");
        });
    }

    // 3. Vérification en temps réel
    function checkAndSubmitForm() {
        console.log("🔍 Vérification des champs...");
        
        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        if (!phoneField || !nameField || !emailField) {
            console.log("🕵️ Champs non trouvés");
            return;
        }

        const phoneNumber = phoneField.value.replace(/\D/g, "");
        
        console.log("📊 État actuel :", {
            téléphone: `${phoneNumber} (${phoneNumber.length}/10)`,
            nom: nameField.value.trim() ? "OK" : "MANQUANT",
            email: emailField.value.trim() ? "OK" : "MANQUANT"
        });

        // Déclenchement automatique si validation OK
        if (phoneNumber.length === 10 && 
            nameField.value.trim() && 
            emailField.value.trim()) {
            console.log("🔥 Déclenchement automatique !");
            saveToGHL();
        }
    }

    // Démarrage
    initEventListeners();
    checkAndSubmitForm(); // Première vérification
});
