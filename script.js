document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    // Configuration avec vos identifiants
    const CONFIG = {
        locationId: "l82KH9dQABB0801TlZAw", // Location ID que vous avez partagé
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY", // Clé API que vous avez partagé
        phoneSelector: "#phone", // Sélecteur du champ téléphone
        nameSelector: "#full_name", // Sélecteur du champ nom
        emailSelector: 'input[name="email"]' // Sélecteur du champ email
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
            // Optionnel : Ajouter un message de succès à l'utilisateur
            alert("Votre contact a été enregistré avec succès !");
        })
        .catch(error => {
            console.error("❌ Erreur d'enregistrement dans GHL :", error);
            // Optionnel : Afficher un message d'erreur à l'utilisateur
            alert("Un problème est survenu lors de l'enregistrement. Veuillez réessayer.");
        });
    }

    // Déclenchement automatique
    const phoneField = document.querySelector(CONFIG.phoneSelector);
    const nameField = document.querySelector(CONFIG.nameSelector);
    const emailField = document.querySelector(CONFIG.emailSelector);

    if (phoneField && nameField && emailField) {
        phoneField.addEventListener("input", function() {
            const phoneNumber = this.value.replace(/\D/g, "");
            
            // Déclenchement si 10 chiffres ET nom et email remplis
            if (phoneNumber.length === 10 && 
                nameField.value.trim() && 
                emailField.value.trim()) {
                console.log("📞 Numéro détecté avec 10 chiffres : Envoi automatique à GHL !");
                saveToGHL();
            }
        });
    }
});
