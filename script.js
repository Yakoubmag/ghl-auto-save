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

    // Fonction principale d'envoi à GoHighLevel
    function saveToGHL() {
        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        // Validation des champs
        if (!phoneField || !nameField || !emailField) {
            console.error("❌ Un ou plusieurs champs sont introuvables !");
            return;
        }

        // Nettoyage du numéro de téléphone
        const phoneNumber = phoneField.value.replace(/\D/g, "");
        
        // Vérifications
        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }

        if (!nameField.value.trim() || !emailField.value.trim()) {
            console.warn("❌ Le nom ou l'email est manquant !");
            return;
        }

        // Préparation des données
        const data = {
            "firstName": nameField.value || "Inconnu",
            "email": emailField.value || "no-email@example.com",
            "phone": phoneNumber,
            "locationId": CONFIG.locationId
        };

        console.log("🚀 Envoi des données à GoHighLevel...", data);

        // Envoi à l'API GoHighLevel
        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${CONFIG.apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log("✅ Contact sauvegardé dans GHL", result);
            alert("Votre contact a été enregistré avec succès !");
        })
        .catch(error => {
            console.error("❌ Erreur d'enregistrement dans GHL :", error);
            alert("Un problème est survenu lors de l'enregistrement. Veuillez réessayer.");
        });
    }

    // Fonction de vérification automatique
    function checkFormCompletion() {
        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        if (!phoneField || !nameField || !emailField) return;

        const phoneNumber = phoneField.value.replace(/\D/g, "");
        
        console.log("🕵️ Vérification du formulaire :", {
            phoneLength: phoneNumber.length,
            nameValue: nameField.value.trim(),
            emailValue: emailField.value.trim()
        });

        // Vérification complète
        if (phoneNumber.length === 10 && 
            nameField.value.trim() && 
            emailField.value.trim()) {
            console.log("✅ Tous les champs sont remplis !");
            saveToGHL();
        }
    }

    // Écouteurs d'événements sur tous les champs
    const phoneField = document.querySelector(CONFIG.phoneSelector);
    const nameField = document.querySelector(CONFIG.nameSelector);
    const emailField = document.querySelector(CONFIG.emailSelector);

    if (phoneField && nameField && emailField) {
        // Ajout d'écouteurs sur plusieurs événements
        phoneField.addEventListener("input", checkFormCompletion);
        nameField.addEventListener("input", checkFormCompletion);
        emailField.addEventListener("input", checkFormCompletion);
        phoneField.addEventListener("change", checkFormCompletion);
        nameField.addEventListener("change", checkFormCompletion);
        emailField.addEventListener("change", checkFormCompletion);
    } else {
        console.error("❌ Un ou plusieurs champs n'ont pas été trouvés !");
    }
});
